import React from 'react';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../config';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Récupérer le token depuis le localStorage
      const token = localStorage.getItem('refreshToken');

      // S'assurer qu'il y a bien un token avant d'envoyer la requête
      if (!token) {
        console.error('No refresh token found');
        return;
      }

      // Effectuer la requête de logout vers l'API
      const response = await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // "Logged out successfully"

        // Supprimer le token dans le localStorage
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken'); // Si vous utilisez un accessToken aussi

        // Rediriger vers la page de login ou d'accueil
        navigate('/login');
      } else {
        console.error(data.message || 'Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
