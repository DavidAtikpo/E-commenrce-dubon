// LoginPage.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button, TextField, Box, Typography } from '@mui/material';
import logo from '../assets/logo.png';
import FacebookIcon from '@mui/icons-material/Facebook';


const LoginPage = () => {
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
  Bienvenue!
</Typography>

        <TextField
          fullWidth
          label="Email or Mobile Number"
          variant="outlined"
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginBottom: '16px', backgroundColor: '#f60' }}
        >
          Continue
        </Button>

        <Typography variant="body2" textAlign="center">
          {/* By continuing you agree to Jumia’s <a href="#">Terms and Conditions</a> */}
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
      </Box>
    </Box>
  );
};

export default LoginPage;
