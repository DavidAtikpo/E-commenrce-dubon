import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import './RatingPopup.css'; // Import du CSS pour styliser le popup

const RatingPopup = ({ orderId, productId, userId, onClose }) => {
  const [rating, setRating] = useState(0); // Nombre d'étoiles pour le produit
  const [comment, setComment] = useState(''); // Commentaire lié à l'emoji sélectionné
  const [deliveryRating, setDeliveryRating] = useState(0); // Nombre d'étoiles pour la livraison
  const [deliveryComment, setDeliveryComment] = useState(''); // Commentaire lié à l'emoji de la livraison
  const [message, setMessage] = useState(''); // Message de succès ou d'erreur

  const handleSubmit = async () => {
    try {
      const data = {
        productId,
        userId,
        rating, // Envoi du nombre d'étoiles pour le produit
        comment, // Envoi du commentaire associé à l'emoji
        deliveryRating, // Envoi du nombre d'étoiles pour la livraison
        deliveryComment // Envoi du commentaire associé à l'emoji de la livraison
      };

      await axios.post(`${API_URL}/api/rating/submit-rating`, data);
      setMessage('Merci pour votre évaluation!');
      setTimeout(() => {
        onClose(); // Fermer le popup après soumission
      }, 2000); // Ferme le popup après 2 secondes
    } catch (error) {
      console.error("Erreur lors de la soumission de l'évaluation :", error);
      setMessage("Erreur lors de la soumission. Veuillez réessayer.");
    }
  };

  const handleEmojiClick = (type, value, commentText) => {
    if (type === 'product') {
      setRating(value); // Nombre d'étoiles pour le produit
      setComment(commentText); // Commentaire lié à l'emoji
    } else if (type === 'delivery') {
      setDeliveryRating(value); // Nombre d'étoiles pour la livraison
      setDeliveryComment(commentText); // Commentaire lié à l'emoji de la livraison
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Merci pour votre commande !</h2>
        <p>Veuillez évaluer le produit et la livraison.</p>

        {/* Évaluation du produit */}
        <div className="star-rating">
          <p>Évaluer le produit (Nombre d'étoiles):</p>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={rating > index ? 'filled-star' : 'empty-star'}
              onClick={() => setRating(index + 1)}
            >
              ★
            </span>
          ))}
        </div>

        <div className="emoji-rating">
          <p>Commentaire du produit :</p>
          <span onClick={() => handleEmojiClick('product', rating, "Très satisfait")} role="img" aria-label="Très satisfait">😊</span>
          <span onClick={() => handleEmojiClick('product', rating, "Satisfait")} role="img" aria-label="Satisfait">😐</span>
          <span onClick={() => handleEmojiClick('product', rating, "Pas satisfait")} role="img" aria-label="Pas satisfait">😢</span>
        </div>

        {/* Évaluation de la livraison */}
        <div className="star-rating">
          <p>Évaluer la livraison (Nombre d'étoiles):</p>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={deliveryRating > index ? 'filled-star' : 'empty-star'}
              onClick={() => setDeliveryRating(index + 1)}
            >
              ★
            </span>
          ))}
        </div>

        <div className="emoji-rating">
          <p>Commentaire sur la livraison :</p>
          <span onClick={() => handleEmojiClick('delivery', deliveryRating, "Livraison rapide et efficace")} role="img" aria-label="Très satisfait">🚚😊</span>
          <span onClick={() => handleEmojiClick('delivery', deliveryRating, "Livraison correcte")} role="img" aria-label="Satisfait">🚚😐</span>
          <span onClick={() => handleEmojiClick('delivery', deliveryRating, "Livraison lente")} role="img" aria-label="Pas satisfait">🚚😢</span>
        </div>

        {/* Affichage d'un message après soumission */}
        {message && <p className="message">{message}</p>}

        <button onClick={handleSubmit}>Soumettre</button>
      </div>
    </div>
  );
};

export default RatingPopup;
