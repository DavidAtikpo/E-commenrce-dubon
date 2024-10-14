import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Avatar } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../config';
import './MonProfile.css'; // Import du fichier CSS

const UserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phoneNumber: '',
    favorites: [],
    profileImage: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      }
    };

    fetchUserData();
  }, []);

  const { firstName, lastName, birthDate, email, phoneNumber, favorites, profileImage } = userData;

  return (
    <div className="user-profile-container">
      <Paper elevation={3} className="user-profile-paper">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} className="user-profile-avatar-container">
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={profileImage || '/default-avatar.png'}
              className="user-profile-avatar"
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4">
              {firstName} {lastName}
            </Typography>
            <Typography variant="body1">
              Date de naissance : {birthDate || 'Non spécifié'}
            </Typography>
            <Typography variant="body1">E-mail : {email}</Typography>
            <Typography variant="body1">Téléphone : {phoneNumber || 'Non spécifié'}</Typography>
          </Grid>
        </Grid>

        <Typography variant="h5" className="user-profile-favorites-title">
          Mes favoris
        </Typography>
        {favorites.length > 0 ? (
          <ul className="user-profile-favorites-list">
            {favorites.map((favorite, index) => (
              <li key={index}>{favorite}</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Vous n'avez pas encore ajouté de favoris.
          </Typography>
        )}
      </Paper>
    </div>
  );
};

export default UserProfile;
