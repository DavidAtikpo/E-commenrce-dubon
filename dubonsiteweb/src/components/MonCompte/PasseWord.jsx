import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Stepper, Step, StepLabel } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../config';
import './PassWord.css'; // Ajoutez un fichier CSS pour les styles

const PasswordUpdateComponent = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(0);
  const [serverMessage] = useState('');

  // Soumettre le nouveau mot de passe au backend
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/change-password`, { currentPassword, newPassword });
      if (response.data.success) {
        alert("Le mot de passe a été changé avec succès.");
        setStep(1); // Processus terminé
      } else {
        alert("Erreur lors du changement de mot de passe.");
      }
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe :", error);
      alert("Une erreur s'est produite.");
    }
  };

  return (
    <div className="password-update-page">
      <div className="form-container">
        <Stepper activeStep={step}>
          <Step>
            <StepLabel>Modifier le mot de passe</StepLabel>
          </Step>
          <Step>
            <StepLabel>Terminé</StepLabel>
          </Step>
        </Stepper>

        {step === 0 && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Modifier votre mot de passe
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Mot de passe actuel"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Nouveau mot de passe"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Confirmer le nouveau mot de passe"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handlePasswordChange}>
                  Modifier le mot de passe
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  {serverMessage || "Veuillez entrer votre mot de passe actuel et un nouveau mot de passe sécurisé."}
                </Typography>
              </Grid>
            </Grid>
          </div>
        )}

        {step === 1 && (
          <Typography variant="h6" color="primary" style={{ marginTop: '20px' }}>
            Processus terminé ! Votre mot de passe a été mis à jour.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default PasswordUpdateComponent;
