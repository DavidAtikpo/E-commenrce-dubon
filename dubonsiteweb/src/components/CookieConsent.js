import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './CookieConsent.css';  // Ajoutez un fichier CSS pour le style

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'accepted', { expires: 365 });  // Cookie valide pendant 1 an
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="cookie-consent">
        <p>Nous utilisons des cookies pour améliorer votre expérience. En poursuivant votre navigation, vous acceptez l'utilisation de cookies.</p>
        <button onClick={handleAccept} className="accept-btn">Accepter</button>
      </div>
    )
  );
};

export default CookieConsent;
