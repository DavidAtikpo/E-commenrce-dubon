// src/utils/geolocationUtils.js

// src/utils/geolocationUtils.js

import axios from 'axios';

export const geocodeAddress = async (address) => {
  const apiKey = 'VOTRE_CLE_API_GOOGLE_MAPS'; // Remplacez par votre clé API
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const location = response.data.results[0].geometry.location;
    return { latitude: location.lat, longitude: location.lng };
  } catch (error) {
    console.error("Erreur lors du géocodage de l'adresse", error);
    return null;
  }
};


export const calculateDistanceToWarehouses = async (userCoordinates, warehouses) => {
    const apiKey = 'VOTRE_CLE_API_GOOGLE_MAPS'; // Remplacez par votre clé API
    const destinations = warehouses.map(
      (warehouse) => `${warehouse.latitude},${warehouse.longitude}`
    ).join('|');
  
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userCoordinates.latitude},${userCoordinates.longitude}&destinations=${destinations}&key=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      const distances = response.data.rows[0].elements;
  
      // Trouver l'entrepôt le plus proche
      let minDistance = Infinity;
      let closestWarehouse = null;
  
      distances.forEach((distance, index) => {
        if (distance.status === 'OK' && distance.distance.value < minDistance) {
          minDistance = distance.distance.value;
          closestWarehouse = warehouses[index];
        }
      });
  
      return closestWarehouse; // Retourne l'entrepôt le plus proche
    } catch (error) {
      console.error("Erreur lors du calcul de la distance", error);
      return null;
    }
  };
  