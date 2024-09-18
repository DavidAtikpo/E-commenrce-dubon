import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import logo from '../../assets/logo.png'; // Assurez-vous que le chemin vers l'image est correct
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logique pour envoyer l'e-mail de réinitialisation de mot de passe ici...
    // Par exemple, faire une requête POST vers le backend avec l'email

    setMessage("Un lien de réinitialisation de mot de passe a été envoyé à votre adresse e-mail.");
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
          maxWidth: '450px',
          width: '100%',
          padding: '20px',
          backgroundColor: 'white',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          <img src={logo} alt="logo" style={{ width: '130px', marginRight: '10px', verticalAlign: 'middle' }} />
          Mot de passe oublié
        </Typography>

        <TextField
          fullWidth
          label="Adresse e-mail"
          variant="outlined"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && (
          <Typography variant="body2" color="success" gutterBottom>
            {message}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: '16px', backgroundColor: '#f60' }}
          onClick={handleSubmit}
        >
          Envoyer le lien de réinitialisation
        </Button>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            <Link to={'/login'}>
              Retourner à la page de 
              <span style={{ cursor: 'pointer', color: '#f60' }}> connexion</span>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
