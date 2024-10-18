import express from 'express';
import axios from'axios';

const router = express.Router();
// import dotenv from'dotenv'config();

const momoApiKey = process.env.MOMO_API_KEY;
const momoApiUserId = process.env.MOMO_API_USER_ID;
const momoBaseUrl = process.env.MOMO_API_BASE_URL;

// Générer un token d'authentification avec MTN MoMo
const generateMomoToken = async () => {
  try {
    const response = await axios.post(`${momoBaseUrl}/token/`, null, {
      headers: {
        'Ocp-Apim-Subscription-Key': momoApiKey
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Erreur lors de la génération du token MoMo:', error);
    throw error;
  }
};

// Route pour initier un paiement MTN MoMo
const createPayment = async (amount, currency, externalId, payerNumber) => {
    const token = await getToken();
    const API_KEY = 'VOTRE_API_KEY';
    const API_USER = 'VOTRE_USER_ID';
  
    const paymentData = {
      amount: amount,
      currency: currency, // 'EUR', 'USD', etc.
      externalId: externalId, // Un ID unique que vous définissez pour cette transaction
      payer: {
        partyIdType: 'MSISDN',
        partyId: payerNumber, // Le numéro MTN MoMo de l'utilisateur (par exemple : '256774290781')
      },
      payerMessage: 'Paiement pour commande e-commerce',
      payeeNote: 'Merci pour votre achat'
    };
  
    try {
      const response = await axios.post(`https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay`, paymentData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Reference-Id': externalId, // un UUID unique pour la transaction
          'X-Target-Environment': 'sandbox', // 'sandbox' ou 'live' pour la production
          'Ocp-Apim-Subscription-Key': API_KEY,
          'Content-Type': 'application/json',
        }
      });
      console.log('Paiement en attente :', response.data);
    } catch (error) {
      console.error('Erreur lors de la demande de paiement', error);
    }
  };
  

export default router;
