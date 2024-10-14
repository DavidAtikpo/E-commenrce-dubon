import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../components/AddEvent.css';
import { TextField, Button, Typography, Box, IconButton, Checkbox, Grid } from '@mui/material';
import { Delete, Edit, Close } from '@mui/icons-material';

const EventForm = () => {
  const [showForm, setShowForm] = useState(false); // Toggle pour afficher/cacher le formulaire
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [media, setMedia] = useState([]);
  const [previews, setPreviews] = useState([]); // Pour prévisualiser les images/vidéos sélectionnées
  const [message, setMessage] = useState('');
  const [events, setEvents] = useState([]); // Stocke les publications existantes
  const [selectedEvents, setSelectedEvents] = useState([]); // Stocke les événements sélectionnés pour suppression

  useEffect(() => {
    fetchEvents(); // Récupère toutes les publications au chargement de la page
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des événements', error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMedia((prevMedia) => [...prevMedia, ...files]);

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...filePreviews]); // Ajoute les nouvelles prévisualisations
  };

  const handleRemoveMedia = (indexToRemove) => {
    setMedia((prevMedia) => prevMedia.filter((_, index) => index !== indexToRemove));
    setPreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    media.forEach((file) => formData.append('media', file));

    try {
      const response = await axios.post('http://localhost:5000/api/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        setMessage('Événement créé avec succès');
        resetForm();
        fetchEvents(); // Rafraîchir les événements après ajout
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'événement", error);
      setMessage("Erreur lors de la création de l'événement");
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setMedia([]);
    setPreviews([]);
  };

  const handleDeleteSelected = async () => {
    try {
      await axios.post('http://localhost:5000/api/events/delete', { ids: selectedEvents });
      setMessage('Événement(s) supprimé(s) avec succès');
      fetchEvents(); // Rafraîchir la liste après suppression
      setSelectedEvents([]);
    } catch (error) {
      console.error('Erreur lors de la suppression des événements', error);
    }
  };

  const handleSelectEvent = (eventId) => {
    setSelectedEvents((prevSelected) =>
      prevSelected.includes(eventId)
        ? prevSelected.filter((id) => id !== eventId)
        : [...prevSelected, eventId]
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Gérer les Événements</Typography>

      <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Masquer le formulaire' : 'Ajouter Événement'}
      </Button>

      {message && <Typography color="primary">{message}</Typography>}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*,video/*"
            required
          />
          {previews.length > 0 && (
            <Box mt={2}>
              <Grid container spacing={2}>
                {previews.map((preview, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} style={{ position: 'relative' }}>
                    {media[index].type.startsWith('image') ? (
                      <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    ) : (
                      <video src={preview} controls style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    )}
                    <IconButton
                      onClick={() => handleRemoveMedia(index)}
                      style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                    >
                      <Close />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          <TextField
            label="Titre de l'événement"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            label="Date"
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
            Publier l'événement
          </Button>
        </form>
      )}

      {/* Liste des publications */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '40px' }}>Liste des Publications</Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteSelected}
        disabled={selectedEvents.length === 0}
        startIcon={<Delete />}
      >
        Supprimer Sélection
      </Button>

      <Box mt={2}>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event._id}>
                <Checkbox
                  checked={selectedEvents.includes(event._id)}
                  onChange={() => handleSelectEvent(event._id)}
                />
                <Typography>{event.title} - {event.date}</Typography>
                <Typography variant="body2">{event.description}</Typography> {/* Affiche la description */}
                {event.media.length > 0 && (
                  <Grid container spacing={2} mt={2}>
                    {event.media.map((mediaItem, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4}>
                        {mediaItem.endsWith('.mp4') ? (  // Suppose que les vidéos sont en .mp4
                          <video src={`http://localhost:5000/${mediaItem}`} controls style={{ maxWidth: '100%' }} />
                        ) : (
                          <img src={`http://localhost:5000/${mediaItem}`} alt="Event Media" style={{ maxWidth: '100%' }} />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                )}
                <IconButton color="primary" onClick={() => alert('Fonction de modification non implémentée')}>
                  <Edit />
                </IconButton>
              </li>
            ))}
          </ul>
        ) : (
          <Typography>Aucun événement disponible</Typography>
        )}
      </Box>
    </Box>
  );
};

export default EventForm;
