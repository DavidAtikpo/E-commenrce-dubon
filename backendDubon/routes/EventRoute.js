import express from 'express';
import eventController from '../controllers/EventCtrl.js';
import upload from '../middleware/upload.js';

const router = express.Router();
// Créer un événement
router.post('/events', upload.array('media', 10), eventController.createEvent);

// Récupérer tous les événements
router.get('/events', eventController.getAllEvents);

// Mettre à jour un événement
router.put('/events/:id', upload.array('media', 10), eventController.updateEvent);

// Supprimer plusieurs événements
router.post('/events/delete', eventController.deleteEvents);

export default router;
