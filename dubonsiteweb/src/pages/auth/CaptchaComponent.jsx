// src/components/CaptchaComponent.js
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { API_URL } from '../../config';

const CaptchaComponent = ({ onVerificationSuccess }) => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleVerification = async () => {
    if (captchaValue) {
      try {
        const response = await axios.post(`${API_URL}/api/user/verify-recaptcha`, {
          token: captchaValue,
        });
        if (response.data.success) {
          onVerificationSuccess();
        } else {
          alert('Échec de la validation CAPTCHA.');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du CAPTCHA:', error);
        alert('Erreur lors de la vérification CAPTCHA.');
      }
    } else {
      alert('Veuillez remplir le CAPTCHA.');
    }
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey="6LfE5loqAAAAAKgvYKBrHQRW76t5Wm521NEDeNSJ" // Remplacez par votre clé de site
        onChange={handleCaptchaChange}
      />
      <button onClick={handleVerification}>Je ne suis pas un robot</button>
    </div>
  );
};

export default CaptchaComponent;
