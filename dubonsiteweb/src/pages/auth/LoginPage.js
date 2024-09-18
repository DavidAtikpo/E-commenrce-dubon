import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button, TextField, Box, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo from '../../assets/logo.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [usePhone, setUsePhone] = useState(false); // Bascule entre email et téléphone
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
       <Link to={'/'}> <Typography variant="h5" gutterBottom textAlign="center">
          <img src={logo} alt="logo" style={{ width: '120px', marginRight: '10px', verticalAlign: 'middle' }} />
          Bienvenue!
        </Typography>
        </Link>

        {/* Bascule entre connexion par email ou téléphone */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px',}}>
          <Button
            variant={usePhone ? "outlined" : "contained"}
            onClick={() => setUsePhone(false)}
            sx={{ marginRight: '10px' }}
          >
            Connexion avec email
          </Button>
          <Button
            variant={usePhone ? "contained" : "outlined"}
            onClick={() => setUsePhone(true)}
          >
            Connexion avec téléphone
          </Button>
        </Box>

        {/* Affichage du champ en fonction du mode sélectionné */}
        {usePhone ? (
          <PhoneInput
            country={'tg'} // Définir le code par défaut sur Togo (+228)
            value={phoneNumber}
            onChange={phone => setPhoneNumber(phone)}
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
          />
        )}

        <TextField
          fullWidth
          label="Mot de passe"
          variant="outlined"
          margin="normal"
          type="password"
        />
         <Link to={'/forgot-password'}><Link/> <Typography variant="body2" textAlign="right" sx={{ marginBottom: '10px' }}>
          Mot de passe oublié ?
        </Typography>
        </Link>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginBottom: '10px', backgroundColor: '#f60' }}
        >
          Se connecter
        </Button>
        
          <Typography variant="body1" textAlign="right">
            <Link to={'/register'}>
            Creer un
            <span style={{cursor:'poiter', color:'#f60'}}> compte </span>
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
      <span style={{color:'blue'}}>Conditions d'utilisation et politique de confidentialite</span>
      </Box>
    </Box>
  );
};

export default LoginPage;
