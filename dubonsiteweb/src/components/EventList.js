import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des événements', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Liste des événements</h2>
      {events.map(event => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <div>
            <h4>Photos:</h4>
            {event.photos.map((photo, index) => (
              <img key={index} src={`http://localhost:5000/${photo}`} alt={`Photo ${index}`} width="200" />
            ))}
          </div>
          <div>
            <h4>Vidéos:</h4>
            {event.videos.map((video, index) => (
              <video key={index} controls width="200">
                <source src={`http://localhost:5000/${video}`} type="video/mp4" />
              </video>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
