import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button, TextField, Box, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo from '../assets/logo.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
//   const [usePhone, setUsePhone] = useState(false); // Bascule entre email et téléphone
  const [phoneNumber, setPhoneNumber] = useState(''); // Stocke le numéro de téléphone

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
        padding: '20px'
      }}
    >
      <Box
        sx={{
          maxWidth: '400px',
          width: '100%',
          padding: '20px',
          backgroundColor: 'white',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          <img src={logo} alt="logo" style={{ width: '130px', marginRight: '10px', verticalAlign: 'middle' }} />
          Inscrivez-vous ici!
        </Typography>

        <TextField
          fullWidth
          label="Nom"
          variant="outlined"
          margin="normal"
          type="password"
        />

       <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="password"
        />
        <PhoneInput
            country={'tg'} // Définir le code par défaut sur Togo (+228)
            value={phoneNumber}
            onChange={phone => setPhoneNumber(phone)}
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
        />
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginBottom: '16px', backgroundColor: '#f60' }}
        >
          Se connecter
        </Button>

        <Typography variant="body2" textAlign="center" sx={{ marginBottom: '16px' }}>
          Mot de passe oublié ?
        </Typography>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            {/* Connectez-vous avec <span onClick={() => setUsePhone(!usePhone)} style={{ cursor: 'pointer', color: '#f60' }}>
              {usePhone ? 'un email' : 'un numéro'}
            </span> */}
            <Link to={'/register'}>
            Creer un
            <span style={{cursor:'poiter', color:'#f60'}}> compte </span>
            </Link>
          </Typography>
        </Box>

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
      </Box>
    </Box>
  );
};

export default RegisterPage;
