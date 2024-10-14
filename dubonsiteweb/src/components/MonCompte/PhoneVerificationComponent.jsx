import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Stepper, Step, StepLabel } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../config';
import './PhoneVerification.css';

const PhoneUpdateComponent = () => {
  const [phone, setPhone] = useState('');
  const [maskedPhone, setMaskedPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [step, setStep] = useState(0);
  const [serverMessage, setServerMessage] = useState('');

  // Récupérer le numéro de téléphone du localStorage
  useEffect(() => {
    const storedPhone = localStorage.getItem('phone');
    if (storedPhone) {
      setPhone(storedPhone);
      setMaskedPhone(maskPhone(storedPhone));
    } else {
      console.error("Le numéro de téléphone n'a pas été trouvé dans le localStorage.");
      setMaskedPhone("Numéro non disponible");
    }
  }, []);

  // Masquer une partie du numéro de téléphone
  const maskPhone = (phone) => {
    return `${phone.slice(0, 3)}***${phone.slice(-2)}`;
  };

  // Envoyer une requête au backend pour générer et envoyer le code de vérification
  const handleGetNewCode = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/send-verification-code-phone`, { phone });
      setServerMessage(response.data.message);
      alert(`Un nouveau code a été envoyé à ${maskedPhone}`);
    } catch (error) {
      console.error("Erreur lors de l'envoi du code :", error);
      setServerMessage("Erreur lors de l'envoi du code.");
    }
  };

  // Soumettre le code au backend pour vérification
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/verify-code-phone`, { phone, code: verificationCode });
      if (response.data.success) {
        setStep(1); // Passer à l'étape suivante (modification du numéro)
      } else {
        alert("Le code de vérification est incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification :", error);
      alert("Une erreur s'est produite lors de la vérification.");
    }
  };

  // Soumettre le nouveau numéro de téléphone au backend
  const handlePhoneChange = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/update-phone`, { oldPhone: phone, newPhone });
      if (response.data.success) {
        alert("Le numéro de téléphone a été changé avec succès.");
        setStep(2); // Processus terminé
      } else {
        alert("Erreur lors de la modification du numéro de téléphone.");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du numéro de téléphone :", error);
      alert("Une erreur s'est produite.");
    }
  };

  return (
    <div className="phone-update-page">
      <div className="form-container">
        <Stepper activeStep={step}>
          <Step>
            <StepLabel>Vérifier le numéro</StepLabel>
          </Step>
          <Step>
            <StepLabel>Modifier le numéro de téléphone</StepLabel>
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
                  Numéro de téléphone : <strong>{maskedPhone}</strong>
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
                  {serverMessage || "Un code de vérification a été envoyé à votre numéro de téléphone. Veuillez ne pas divulguer ce code."}
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
              Modifier votre numéro de téléphone
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nouveau numéro de téléphone"
                  variant="outlined"
                  fullWidth
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handlePhoneChange}>
                  Soumettre le nouveau numéro
                </Button>
              </Grid>
            </Grid>
          </div>
        )}

        {step === 2 && (
          <Typography variant="h6" color="primary" style={{ marginTop: '20px' }}>
            Processus terminé ! Votre numéro de téléphone a été mis à jour.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default PhoneUpdateComponent;
