import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import RatingPopup from './RatingPopup'; // Le composant popup d'évaluation
import './CheckingStatus.css'; // Fichier CSS

const CheckingStatus = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // État pour capturer le message d'erreur

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/status`);
        setOrderStatus(data.status); // "en traitement", "livré", etc.
        setPaymentStatus(data.isPaid ? "Payé" : "Non payé");
        setDeliveryStatus(data.deliveryStatus); // Statut de la livraison

        // Si la commande est livrée, afficher le popup d'évaluation
        if (data.deliveryStatus === "livré") {
          setShowRatingPopup(true);
        }
      } catch (error) {
        // Afficher l'erreur dans l'état et sur la page au lieu de la console
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message); // Message d'erreur envoyé par le backend
        } else {
          setErrorMessage("Une erreur est survenue lors de la récupération du statut de la commande."); // Message générique
        }
      }
    };

    fetchOrderStatus();
  }, [orderId]);

  return (
    <div className="status-container">
      <h3>Suivi de votre commande</h3>

      {/* Affichage du message d'erreur s'il y en a */}
      {errorMessage && (
        <p className="error-message" style={{ color: 'red' }}>
          {errorMessage}
        </p>
      )}

      <p><strong>Statut de la commande :</strong> {orderStatus || "En attente"}</p>
      <p><strong>Statut du paiement :</strong> {paymentStatus || "Non payé"}</p>
      <p><strong>Statut de la livraison :</strong> {deliveryStatus || "En cours de traitement"}</p>

      {showRatingPopup && <RatingPopup orderId={orderId} />}
    </div>
  );
};

export default CheckingStatus;
