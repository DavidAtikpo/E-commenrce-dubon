import React, { useState, useRef } from 'react';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const VerifyCodePage = () => {
  const location = useLocation();
  const email = location.state?.email || ''; 
  const [code, setCode] = useState(new Array(6).fill('')); // tableau pour 6 chiffres
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // État de chargement
  const navigate = useNavigate();

  // Références pour chaque champ
  const inputRefs = useRef([]);

  // Gestion de l'entrée du code
  const handleChange = (element, index) => {
    const value = element.value;
    if (/^[0-9]?$/.test(value)) { // Autorise le vide ou un chiffre
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Passer au champ suivant si un chiffre est entré
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Retourner au champ précédent si "Backspace" est pressé et effacer l'entrée
  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      const newCode = [...code];

      // Efface l'entrée actuelle
      if (!newCode[index] && index > 0) {
        inputRefs.current[index - 1].focus(); // Retour au champ précédent si vide
      } else {
        newCode[index] = ''; // Efface l'entrée actuelle
        setCode(newCode);
      }
    }
  };

  // Concatenation du code final et envoi au serveur
  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join(''); // Assemble le code à partir des 6 champs

    setLoading(true); // Activer le chargement

    try {
      const response = await axios.post('http://localhost:5000/api/user/verifycode', {
        email,
        code: verificationCode,
      });

      if (response.data.success) {
        setMessage("Code vérifié avec succès. Vous serez redirigé vers la page de réinitialisation.");
        setTimeout(() => {
          navigate(`/reset-password?email=${email}`);
        }, 2000);
      } else {
        setMessage(response.data.message || "Code invalide ou expiré.");
      }
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }

    setLoading(false); // Désactiver le chargement après la requête
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
        <Typography variant="h6" gutterBottom textAlign="center">
          Saisissez votre code de vérification
        </Typography>

        <Box display="flex" justifyContent="space-between">
          {code.map((digit, index) => (
            <TextField
              key={index}
              type="text"
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center' }
              }}
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)} // Détecte le backspace pour retourner au champ précédent
              inputRef={el => inputRefs.current[index] = el} // Référence pour le champ
              sx={{ width: '48px', margin: '0 5px' }} // largeur de chaque champ
            />
          ))}
        </Box>

        {message && (
          <Typography variant="body2" color={message.includes('succès') ? 'success' : 'error'} gutterBottom>
            {message}
          </Typography>
        )}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: '16px', backgroundColor: '#f60' }}
            onClick={handleSubmit}
            disabled={loading} // Désactiver le bouton lors du chargement
          >
            {loading ? <CircularProgress size={24} /> : 'Vérifier le code'}
          </Button>
        </Box>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            <Link to={'/forgot-password'}>
              Retourner à la page de 
              <span style={{ cursor: 'pointer', color: '#f60' }}> demande de mot de passe oublié</span>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyCodePage;
