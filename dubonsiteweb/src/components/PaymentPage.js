import React, { useState } from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleMTNMoMoPayment = async () => {
    try {
      // Appel au backend pour initier le paiement avec MTN MoMo
      const response = await axios.post('/api/mtn-momo-payment', {
        amount: 100, // Montant de la transaction
        payerNumber: '229XXXXXXXX' // Numéro de téléphone MTN MoMo de l'utilisateur
      });
      setPaymentStatus('Paiement en cours...');
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors du paiement', error);
      setPaymentStatus('Erreur lors du paiement.');
    }
  };

  return (
    <div>
      <h1>Payer avec MTN MoMo</h1>
      <button onClick={handleMTNMoMoPayment}>Payer avec MTN MoMo</button>
      <p>{paymentStatus}</p>
    </div>
  );
};

export default PaymentPage;
