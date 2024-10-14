import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Stepper, Step, StepLabel } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../config';

const VerificationComponent = () => {
  const [email, setEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [step, setStep] = useState(0);
  const [serverMessage, setServerMessage] = useState('');

  // Récupérer l'email de localStorage
 // Récupérer l'email de localStorage
useEffect(() => {
  const storedEmail = localStorage.getItem('email');
  if (storedEmail) {
    setEmail(storedEmail);
    setMaskedEmail(maskEmail(storedEmail));
  } else {
    console.error("L'email n'a pas été trouvé dans le localStorage.");
    setMaskedEmail("Email non disponible");
  }
}, []);


  // Fonction pour masquer une partie de l'email
  const maskEmail = (email) => {
    const [localPart, domain] = email.split('@');
    return `${localPart.slice(0, 3)}***@${domain}`;
  };

  // Envoyer une requête au backend pour générer et envoyer le code
  const handleGetNewCode = async () => {
    try {
      const response = await axios.post(`${ API_URL }/api/send-verification-code`, { email });
      setServerMessage(response.data.message);
      alert(`Un nouveau code a été envoyé à ${maskedEmail}`);
    } catch (error) {
      console.error("Erreur lors de l'envoi du code :", error);
      setServerMessage("Erreur lors de l'envoi du code.");
    }
  };

  // Soumettre le code au backend pour vérification
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ API_URL }/api/verify-code`, { email, code: verificationCode });
      if (response.data.success) {
        setStep(1); // Passer à l'étape suivante (modification email)
      } else {
        alert("Le code de vérification est incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification :", error);
      alert("Une erreur s'est produite lors de la vérification.");
    }
  };

  // Soumettre le nouvel email au backend
  const handleEmailChange = async () => {
    try {
      const response = await axios.post(`${ API_URL }/api/update-email`, { oldEmail: email, newEmail });
      if (response.data.success) {
        alert("L'email a été changé avec succès.");
        setStep(2); // Processus terminé
      } else {
        alert("Erreur lors de la modification de l'email.");
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'email :", error);
      alert("Une erreur s'est produite.");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: "90px" }}>
      <Stepper activeStep={step}>
        <Step>
          <StepLabel>Vérifier l'identité</StepLabel>
        </Step>
        <Step>
          <StepLabel>Modifier l'adresse e-mail</StepLabel>
        </Step>
        <Step>
          <StepLabel>Terminé</StepLabel>
        </Step>
      </Stepper>

      {step === 0 && (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Pour protéger votre compte, veuillez compléter la vérification.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Adresse e-mail : <strong>{maskedEmail}</strong>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Code de vérification"
                variant="outlined"
                fullWidth
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" color="primary" onClick={handleGetNewCode}>
                Obtenir à nouveau le code
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                {serverMessage || "Un code de vérification a été envoyé à votre adresse e-mail et reste valable pendant 30 minutes. Veuillez ne pas divulguer ce code à d'autres personnes."}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Soumettre
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      {step === 1 && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Modifier votre adresse e-mail
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nouvelle adresse e-mail"
                variant="outlined"
                fullWidth
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleEmailChange}>
                Soumettre la nouvelle adresse e-mail
              </Button>
            </Grid>
          </Grid>
        </div>
      )}

      {step === 2 && (
        <Typography variant="h6" color="primary" style={{ marginTop: '20px' }}>
          Processus terminé ! Votre adresse e-mail a été mise à jour.
        </Typography>
      )}
    </div>
  );
};

export default VerificationComponent;
