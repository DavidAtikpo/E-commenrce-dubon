import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button, TextField, Box, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo from '../../assets/logo.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assurez-vous d'avoir installé axios: npm install axios

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fonction pour gérer la soumission du formulaire
  const handleRegister = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', {
        name,
        email,
        mobile,
        password,
      });
      
      // Si la réponse est positive, rediriger l'utilisateur ou afficher un message de succès
      if (response.status === 201) {
        alert('Inscription réussie!');
        navigate('/login'); // Rediriger vers la page de connexion
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setErrorMessage('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
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
          maxWidth: '450px',
          width: '100%',
          padding: '20px',
          backgroundColor: 'white',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          <img src={logo} alt="logo" style={{ width: '120px', marginRight: '10px', verticalAlign: 'middle' }} />
          Inscrivez-vous ici!
        </Typography>

        {errorMessage && (
          <Typography color="error" textAlign="center" gutterBottom>
            {errorMessage}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Nom"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PhoneInput
          country={'tg'}
          value={mobile}
          onChange={(phone) => setPhoneNumber(phone)}
          inputStyle={{
            width: '100%',
            marginBottom: '16px',
          }}
          containerStyle={{
            marginBottom: '16px',
          }}
        />

        <TextField
          fullWidth
          label="Mot de passe"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginBottom: '16px', backgroundColor: '#f60' }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? 'Enregistrement...' : 'S\'enregistrer'}
        </Button>

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

        <Box textAlign="center" mt={1}>
          <Typography variant="body2">
            <Link to={'/login'}>
              Avez-vous déjà un <span style={{ cursor: 'pointer', color: '#f60' }}>compte ?</span>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
