import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import logo from '../../assets/logo.png'; // Assurez-vous que le chemin vers l'image est correct
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    // Logique pour réinitialiser le mot de passe ici...
    // Par exemple, faire une requête POST vers le backend

    setMessage("Votre mot de passe a été réinitialisé avec succès.");
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
          Réinitialisez votre mot de passe
        </Typography>

        <TextField
          fullWidth
          label="Nouveau mot de passe"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          fullWidth
          label="Confirmer le mot de passe"
          variant="outlined"
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {message && (
          <Typography variant="body2" color="error" gutterBottom>
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
          Réinitialiser le mot de passe
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

export default ResetPasswordPage;
