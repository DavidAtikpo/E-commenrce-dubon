import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button, TextField, Box, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo from '../../assets/logo.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Cookies from 'js-cookie'; // Importer js-cookie pour la gestion des cookies
import {API_URL} from '../../config.js'
const LoginPage = () => {
  const [usePhone, setUsePhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fonction pour gérer la soumission du formulaire
  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    const credentials = usePhone ? { phoneNumber, password } : { email, password };

    try {
      const response = await axios.post(`${API_URL}/api/user/login`, credentials);

      // Si la réponse est positive, enregistrer le token dans un cookie sécurisé
      if (response.status === 200) {
        const token = response.data.token;
        const name = response.data.name;
        console.log('user',name);
        
        console.log("token",token);
        // localStorage.setItem('token',token)
        localStorage.setItem('token', token, { expires: 7, secure: true, sameSite: 'Strict' }); 
        localStorage.setItem('name',name)
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setErrorMessage('Erreur de connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      const response = await axios.post(`${API_URL}/api/user/google-login`, { token: googleToken });

      if (response.status === 200) {
        const token = response.data.token;
        
        localStorage.setItem('token', token, { expires: 7, secure: true, sameSite: 'Strict' }); // Sauvegarder le token JWT dans les cookies
        
        navigate('/'); // Redirection après succès
      }
    } catch (error) {
      console.error('Google Login Failed:', error);
      setErrorMessage('Erreur lors de la connexion avec Google.');
    }
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
            country={'tg'}
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
