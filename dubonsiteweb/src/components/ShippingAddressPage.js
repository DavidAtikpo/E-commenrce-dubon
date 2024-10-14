// import React, { useState, useRef, useEffect } from 'react';
// import { Button, TextField, Box, Typography, Checkbox, FormControlLabel, MenuItem } from '@mui/material';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// import './ShippingAddress.css'; // Import du fichier CSS

// const ShippingAddressPage = () => {
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [postalCode, setPostalCode] = useState('');
//   const [country, setCountry] = useState('Togo'); // Pays par défaut
//   const [state, setState] = useState('');
//   const [useGeoLocation, setUseGeoLocation] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
//   const navigate = useNavigate();

//   const addressInputRef = useRef(null);

//   useEffect(() => {
//     const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
//       types: ['geocode'],
//       componentRestrictions: { country: 'TG' }, // Limiter aux adresses togolaises
//     });

//     autocomplete.addListener('place_changed', () => {
//       const place = autocomplete.getPlace();
//       const selectedAddress = place.formatted_address;
//       setAddress(selectedAddress);

//       place.address_components.forEach(component => {
//         const types = component.types;

//         if (types.includes('locality')) {
//           setCity(component.long_name);
//         }

//         if (types.includes('administrative_area_level_1')) {
//           setState(component.long_name);
//         }

//         if (types.includes('postal_code')) {
//           setPostalCode(component.long_name);
//         }
//       });

//       const location = place.geometry.location;
//       setCoordinates({
//         lat: location.lat(),
//         lng: location.lng(),
//       });
//     });
//   }, []);

//   const handleShipping = async () => {
//     if (!acceptTerms) {
//       setErrorMessage('Vous devez accepter les termes et conditions pour continuer.');
//       return;
//     }
  
//     const shippingData = {
//       name,
//       mobile,
//       address,
//       city,
//       postalCode,
//       state,
//       country,
//       ...(useGeoLocation && coordinates.lat && coordinates.lng ? { coordinates } : {}),
//     };
  
//     // Sauvegarder les données dans localStorage ou Redux
//     localStorage.setItem('shippingAddress', JSON.stringify(shippingData));
  
//     // Naviguer vers la page de paiement
//     navigate('/payment');
//   };
  

//   //   try {
//   //     const response = await axios.post('http://localhost:5000/api/shipping', shippingData);
//   //     if (response.status === 200) {
//   //       navigate('/order-summary');
//   //     }
//   //   } catch (error) {
//   //     setErrorMessage('Erreur lors de l\'envoi des informations de livraison.');
//   //   }
//   // };

//   return (
//     <Box className="shipping-address-container">
//       <Typography variant="h6" className="shipping-address-header">
//         Adresse de livraison
//       </Typography>
//       <Typography variant="body2" color="textSecondary" className="shipping-address-subtitle">
//         Vos informations personnelles sont cryptées et ne seront utilisées qu'à des fins de livraison.
//       </Typography>

//       <TextField
//         label="Pays/région"
//         variant="outlined"
//         value={country}
//         onChange={(e) => setCountry(e.target.value)}
//         className="shipping-address-field"
//       >
//         <MenuItem value="Togo">Togo</MenuItem>
//         <MenuItem value="France">France</MenuItem>
//         <MenuItem value="United States">États-Unis</MenuItem>
//         <MenuItem value="Canada">Canada</MenuItem>
//       </TextField>

//       <Box className="shipping-address-row">
//         <TextField
//           fullWidth
//           label="Prénom et nom de famille"
//           variant="outlined"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="shipping-address-field"
//         />
//         <PhoneInput
//           country={'tg'}
//           value={mobile}
//           onChange={(phone) => setMobile(phone)}
//           inputStyle={{ width: '100%' }}
//         />
//       </Box>

//       <TextField
//         fullWidth
//         label="Adresse ou boite postale"
//         variant="outlined"
//         inputRef={addressInputRef}
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         className="shipping-address-autocomplete"
//       />

//       <Box className="shipping-address-location-row">
//         <TextField
//           fullWidth
//           label="État/province"
//           variant="outlined"
//           value={state}
//           onChange={(e) => setState(e.target.value)}
//           className="shipping-address-field"
//         />
//         <TextField
//           fullWidth
//           label="Ville"
//           variant="outlined"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="shipping-address-field"
//         />
//         <TextField
//           fullWidth
//           label="Code postal"
//           variant="outlined"
//           value={postalCode}
//           onChange={(e) => setPostalCode(e.target.value)}
//           className="shipping-address-field"
//         />
//       </Box>

//       <FormControlLabel
//         control={<Checkbox checked={useGeoLocation} onChange={(e) => setUseGeoLocation(e.target.checked)} />}
//         label="Utiliser ma position actuelle pour la livraison"
//         className="shipping-address-checkbox"
//       />
//       <FormControlLabel
//         control={<Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />}
//         label="J'accepte les conditions d'utilisation et la politique de confidentialité."
//         className="shipping-address-checkbox"
//       />

//       {errorMessage && <Typography color="error" className="shipping-address-error">{errorMessage}</Typography>}

//       <Button fullWidth variant="contained" color="primary" onClick={handleShipping} className="shipping-address-button">
//         Continuer au paiement
//       </Button>
//     </Box>
//   );
// };

// export default ShippingAddressPage;


import React, { useState, useRef, useEffect } from 'react';
import { Button, TextField, Box, Typography, Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import './ShippingAddress.css'; // Import du fichier CSS

const ShippingAddressPage = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState(''); // Initialisez comme vide et mettez à jour automatiquement
  const [countryCode, setCountryCode] = useState(''); // Pour stocker le code pays
  const [state, setState] = useState('');
  const [useGeoLocation, setUseGeoLocation] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const navigate = useNavigate();
  
  const addressInputRef = useRef(null);

  // Fonction pour détecter le pays et le code pays automatiquement
  useEffect(() => {
    const fetchGeoInfo = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json?token=YOUR_API_TOKEN'); // Remplacez par votre token ipinfo.io
        const data = await response.json();
        setCountry(data.country); // Définir le pays automatiquement
        setCountryCode(data.country); // Mettre à jour le code pays dans PhoneInput
      } catch (error) {
        console.error('Erreur lors de la récupération de la géolocalisation', error);
      }
    };

    fetchGeoInfo();
  }, []);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      types: ['geocode'],
      componentRestrictions: { country: 'TG' }, // Limiter aux adresses togolaises
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const selectedAddress = place.formatted_address;
      setAddress(selectedAddress);

      place.address_components.forEach(component => {
        const types = component.types;

        if (types.includes('locality')) {
          setCity(component.long_name);
        }

        if (types.includes('administrative_area_level_1')) {
          setState(component.long_name);
        }

        if (types.includes('postal_code')) {
          setPostalCode(component.long_name);
        }
      });

      const location = place.geometry.location;
      setCoordinates({
        lat: location.lat(),
        lng: location.lng(),
      });
    });
  }, []);

  const handleShipping = async () => {
    if (!acceptTerms) {
      setErrorMessage('Vous devez accepter les termes et conditions pour continuer.');
      return;
    }

    const shippingData = {
      name,
      mobile,
      address,
      city,
      postalCode,
      state,
      country,
      ...(useGeoLocation && coordinates.lat && coordinates.lng ? { coordinates } : {}),
    };

    // Sauvegarder les données dans localStorage ou Redux
    localStorage.setItem('shippingAddress', JSON.stringify(shippingData));

    // Naviguer vers la page de paiement
    navigate('/summary');
  };

  return (
    <Box className="shipping-address-container">
      <Typography variant="h6" className="shipping-address-header">
        Adresse de livraison
      </Typography>
      <Typography variant="body2" color="textSecondary" className="shipping-address-subtitle">
        Vos informations personnelles sont cryptées et ne seront utilisées qu'à des fins de livraison.
      </Typography>

      <TextField
        label="Pays/région"
        variant="outlined"
        value={country} // Utiliser la valeur du pays détectée
        onChange={(e) => setCountry(e.target.value)}
        className="shipping-address-field"
      >
        <MenuItem value="Togo">Togo</MenuItem>
        <MenuItem value="France">France</MenuItem>
        <MenuItem value="United States">États-Unis</MenuItem>
        <MenuItem value="Canada">Canada</MenuItem>
      </TextField>

      <Box className="shipping-address-row">
        <TextField
          fullWidth
          label="Prénom et nom de famille"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shipping-address-field"
        />
        <PhoneInput
          country={countryCode.toLowerCase()} // Utilisez le code pays détecté pour PhoneInput
          value={mobile}
          onChange={(phone) => setMobile(phone)}
          inputStyle={{ width: '100%' }}
        />
      </Box>

      <TextField
        fullWidth
        label="Adresse ou boite postale"
        variant="outlined"
        inputRef={addressInputRef}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="shipping-address-autocomplete"
      />

      <Box className="shipping-address-location-row">
        <TextField
          fullWidth
          label="État/province"
          variant="outlined"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="shipping-address-field"
        />
        <TextField
          fullWidth
          label="Ville"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="shipping-address-field"
        />
        <TextField
          fullWidth
          label="Code postal"
          variant="outlined"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="shipping-address-field"
        />
      </Box>

      <FormControlLabel
        control={<Checkbox checked={useGeoLocation} onChange={(e) => setUseGeoLocation(e.target.checked)} />}
        label="Utiliser ma position actuelle pour la livraison"
        className="shipping-address-checkbox"
      />
      <FormControlLabel
        control={<Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />}
        label="J'accepte les conditions d'utilisation et la politique de confidentialité."
        className="shipping-address-checkbox"
      />

      {errorMessage && <Typography color="error" className="shipping-address-error">{errorMessage}</Typography>}

      <Button fullWidth variant="contained" color="primary" onClick={handleShipping} className="shipping-address-button">
        Continuer au paiement
      </Button>
    </Box>
  );
};

export default ShippingAddressPage;
