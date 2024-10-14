import React, { useState } from 'react';
import axios from 'axios';

const PromoForm = ({ userId }) => {
  const [promoCode, setPromoCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/apply-promo', { userId, promoCode });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de l\'application du code promo.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Entrez votre code promo :</label>
      <input 
        type="text" 
        value={promoCode} 
        onChange={(e) => setPromoCode(e.target.value)} 
        required 
      />
      <button type="submit">Appliquer le code</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default PromoForm;
