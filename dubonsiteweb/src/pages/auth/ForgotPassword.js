import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import logo from '../../assets/logo.png'; // Assurez-vous que le chemin vers l'image est correct
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // Pour gérer les erreurs
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/forgot-password', {
        email,
      });

      if (response.status === 200 || response.status === 201) {
        setMessage('Un lien a été envoyé à votre email.');
        localStorage.setItem("Email",email)
        navigate('/verification-code', { state: { email } }); 
        setError(''); // Réinitialiser l'erreur en cas de succès
      }
    } catch (error) {
      console.error(error);
      setError('Une erreur est survenue. Veuillez réessayer.'); // Gérer l'erreur
      setMessage(''); // Réinitialiser le message en cas d'erreur
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

        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
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
