import axios from'axios';

// Fonction pour obtenir les coordonnées géographiques d'une adresse (API de Google Maps ou similaire)
const getCoordinatesFromAddress = async (address) => {
    try {
        const API_KEY = process.env.GEO_API_KEY;  // Clé API pour le service de géolocalisation
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to find the location.');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error while fetching geolocation.');
    }
};

// Fonction pour obtenir les coordonnées d'un utilisateur via l'API HTML5
const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser.'));
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => reject(error)
            );
        }
    });
};

export default {
    getCoordinatesFromAddress,
    getCurrentPosition,
};
