import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import logo from '../../assets/logo.png'; // Assurez-vous que le chemin vers l'image est correct
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Pou

const ResetPasswordPage = () => {
  const location = useLocation();
  const email = location.state?.email || ''; // Récupérer l'email depuis l'état passé par la page précédente

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);

      // Envoyer la requête avec l'email récupéré
      const response = await axios.put('http://localhost:5000/api/user/reset-password', {
        email, // Utilisation de l'email récupéré
        password,
      });

      if (response.data.success) {
        setMessage("Votre mot de passe a été réinitialisé avec succès.");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage(response.data.message || "Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
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
        <Typography variant="h6" gutterBottom textAlign="center">
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
          <Typography variant="body2" color={message.includes('succès') ? 'success' : 'error'} gutterBottom>
            {message}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: '16px', backgroundColor: '#f60' }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Chargement...' : 'Réinitialiser le mot de passe'}
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
