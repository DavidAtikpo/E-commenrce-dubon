import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button, TextField, Box, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo from '../../assets/logo.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assurez-vous d'avoir installé axios: npm install axios

const LoginPage = () => {
  const [usePhone, setUsePhone] = useState(false); // Bascule entre email et téléphone
  const [phoneNumber, setPhoneNumber] = useState(''); // Stocke le numéro de téléphone
  const [email, setEmail] = useState(''); // Stocke l'email
  const [password, setPassword] = useState(''); // Stocke le mot de passe
  const [loading, setLoading] = useState(false); // Gérer l'état du chargement
  const [errorMessage, setErrorMessage] = useState(''); // Gérer les erreurs
  const navigate = useNavigate();

  // Fonction pour gérer la soumission du formulaire
  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    const credentials = usePhone ? { phoneNumber, password } : { email, password };

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', credentials);
      
      // Si la réponse est positive, rediriger l'utilisateur ou enregistrer le token
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('authToken', token); // Sauvegarder le token JWT
        navigate('/user-dash'); // Rediriger l'utilisateur après la connexion
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setErrorMessage('Erreur de connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    // Ici vous pouvez envoyer le token Google au backend pour validation
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          maxWidth: '400px',
          width: '100%',
          padding: '20px',
          backgroundColor: 'white',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
          borderRadius: '8px',
        }}
      >
        <Link to={'/'}>
          <Typography variant="h6" gutterBottom textAlign="center">
            <img src={logo} alt="logo" style={{ width: '100px', marginRight: '10px', verticalAlign: 'middle' }} />
            Bienvenue!
          </Typography>
        </Link>

        {/* Affichage des erreurs */}
        {errorMessage && (
          <Typography color="error" textAlign="center" gutterBottom>
            {errorMessage}
          </Typography>
        )}

        {/* Bascule entre connexion par email ou téléphone */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <Button
            variant={usePhone ? 'outlined' : 'contained'}
            onClick={() => setUsePhone(false)}
            sx={{ marginRight: '10px' }}
          >
           <h5> Connexion avec email</h5>
          </Button>
          <Button
            variant={usePhone ? 'contained' : 'outlined'}
            onClick={() => setUsePhone(true)}
          >
           <h5>Connexion avec téléphone</h5> 
          </Button>
        </Box>

        {/* Affichage du champ en fonction du mode sélectionné */}
        {usePhone ? (
          <PhoneInput
            country={'tg'} // Définir le code par défaut sur Togo (+228)
            value={phoneNumber}
            onChange={(phone) => setPhoneNumber(phone)}
            inputStyle={{
              width: '100%',
              marginBottom: '10px',
            }}
            containerStyle={{
              marginBottom: '10px',
            }}
          />
        ) : (
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        <TextField
          fullWidth
          label="Mot de passe"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to={'/forgot-password'}>
          <Typography variant="body2" textAlign="right" sx={{ marginBottom: '10px' }}>
            Mot de passe oublié ?
          </Typography>
        </Link>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginBottom: '10px', backgroundColor: '#f60' }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>

        <Typography variant="body1" textAlign="right">
          <Link to={'/register'}>
            Créer un <span style={{ cursor: 'pointer', color: '#f60' }}>compte</span>
          </Link>
        </Typography>

        <Button
          fullWidth
          variant="contained"
          startIcon={<FacebookIcon />}
          sx={{ marginTop: '12px', backgroundColor: '#4267B2' }}
        >
          Se connecter avec Facebook
        </Button>

        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => console.log('Login Failed')}
            width="100%"
          />
        </GoogleOAuthProvider>
        <span style={{ color: 'blue' }}>Conditions d'utilisation et politique de confidentialité</span>
      </Box>
    </Box>
  );
};

export default LoginPage;
