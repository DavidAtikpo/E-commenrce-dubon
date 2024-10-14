import React, { useState } from 'react';
import axios from 'axios';
import './AdminAdForm.css'

const AdminAdForm = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [message, setMessage] = useState(''); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/banner/add-ad', { imageUrl, linkUrl, altText });
      setMessage('Publicité ajoutée avec succès');
      setImageUrl('');
      setLinkUrl('');
      setAltText('');
    } catch (error) {
      setMessage('Erreur lors de l\'ajout de la publicité');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>URL de l'image:</label>
        <input 
          type="text" 
          value={imageUrl} 
          onChange={(e) => setImageUrl(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>URL du lien:</label>
        <input 
          type="text" 
          value={linkUrl} 
          onChange={(e) => setLinkUrl(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Texte alternatif:</label>
        <input 
          type="text" 
          value={altText} 
          onChange={(e) => setAltText(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Ajouter la publicité</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AdminAdForm;
