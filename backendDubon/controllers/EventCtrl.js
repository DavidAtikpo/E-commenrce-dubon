import Event from '../models/EventModel.js'; // Modèle pour enregistrer les événements dans la base de données

import fs from 'fs';
import path from 'path';

// Créer un nouvel événement (POST)
const createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const mediaFiles = req.files;

    // Création du tableau de chemins des médias
    const mediaPaths = mediaFiles.map(file => file.path);

    const newEvent = new Event({
      title,
      description,
      date,
      media: mediaPaths, // Sauvegarde des chemins d'accès aux fichiers
    });

    await newEvent.save();
    res.status(201).json({ message: 'Événement créé avec succès', event: newEvent });
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'événement' });
  }
};

// Récupérer tous les événements (GET)
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Erreur lors du chargement des événements', error);
    res.status(500).json({ message: 'Erreur lors du chargement des événements' });
  }
};

// Mettre à jour un événement (PUT)
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, description, date } = req.body;
    const mediaFiles = req.files;

    // Mettre à jour les champs existants
    const updatedEvent = await Event.findByIdAndUpdate(eventId, {
      title,
      description,
      date,
      media: mediaFiles.map(file => file.path), // Mettre à jour les chemins de médias si présents
    }, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    res.status(200).json({ message: 'Événement mis à jour avec succès', event: updatedEvent });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'événement', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'événement' });
  }
};

// Supprimer un ou plusieurs événements (DELETE)
const deleteEvents = async (req, res) => {
  try {
    const { ids } = req.body; // Tableau d'IDs d'événements à supprimer

    const eventsToDelete = await Event.find({ _id: { $in: ids } });

    // Supprimer les fichiers média associés
    eventsToDelete.forEach(event => {
      event.media.forEach(mediaPath => {
        fs.unlink(mediaPath, (err) => {
          if (err) {
            console.error('Erreur lors de la suppression du fichier média:', mediaPath, err);
          }
        });
      });
    });

    await Event.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: 'Événements supprimés avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression des événements', error);
    res.status(500).json({ message: 'Erreur lors de la suppression des événements' });
  }
};


export default {createEvent,getAllEvents,deleteEvents,updateEvent}
