import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import logo from '../../assets/logo.png'; // Assurez-vous que le chemin vers l'image est correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
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

    // Récupérer l'email depuis le localStorage
    const email = localStorage.getItem('Email');
    
    if (!email) {
      setMessage("Aucun email trouvé. Veuillez réessayer.");
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
        localStorage.removeItem('Email')
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
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <img src={logo} alt="Logo" style={{ width: 100, marginBottom: 20 }} />
      <Typography variant="h5" gutterBottom>Réinitialiser le mot de passe</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nouveau mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirmer le mot de passe"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        {message && <Typography color="error">{message}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          style={{ marginTop: 20 }}
        >
          {loading ? "En cours..." : "Réinitialiser"}
        </Button>
      </form>
    </Box>
  );
};

export default ResetPasswordPage;
