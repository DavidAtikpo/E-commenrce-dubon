import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faGlobe, faEnvelope, faClipboard } from '@fortawesome/free-solid-svg-icons';
import '../styles/components/TopBar.css'

const TopBar = () => {
  const [language, setLanguage] = useState('FR');
  const [currency, setCurrency] = useState('Dollar');
  const [address, setAddress] = useState('');
  
  return (
    <div className="top-bar">
      {/* Logo */}
      <div className="logo">
        <a href="/">DUBON Service</a>
      </div>
      
      {/* Recherche avec menu déroulant */}
      <div className="search-bar">
        <DropdownButton title="Fabricants">
          <Dropdown.Item>Produits</Dropdown.Item>
          <Dropdown.Item>Service</Dropdown.Item>
          <Dropdown.Item>Événementiel</Dropdown.Item>
          <Dropdown.Item>Import & Export</Dropdown.Item>
          <Dropdown.Item>E-Restaurant</Dropdown.Item>
        </DropdownButton>
        <input type="text" placeholder="Trouvez des fabricants ici" />
        <button>Rechercher</button>
      </div>

      {/* Menu déroulant pour la langue et la devise */}
      <div className="lang-currency">
        <DropdownButton title={<FontAwesomeIcon icon={faGlobe} />}>
          <Dropdown.Item onClick={() => setLanguage('FR')}>Français</Dropdown.Item>
          <Dropdown.Item onClick={() => setLanguage('EN')}>English</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setCurrency('Dollar')}>Dollar</Dropdown.Item>
          <Dropdown.Item onClick={() => setCurrency('FCFA')}>Franc CFA</Dropdown.Item>
        </DropdownButton>
        <span>Livrer à :</span>
        <DropdownButton title={<img src="/path-to-flag-icon.png" alt="Flag" />}>
          <div className="address-dropdown">
            <input 
              type="text" 
              placeholder="Entrez votre adresse" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
            <button onClick={() => alert('Adresse sauvegardée !')}>Sauvegarder</button>
          </div>
        </DropdownButton>
      </div>

      {/* Icones pour Messages, Profil, Commandes */}
      <div className="icons">
        <DropdownButton title={<FontAwesomeIcon icon={faEnvelope} />}>
          <Dropdown.Item>Messages</Dropdown.Item>
          <Dropdown.Item>Notifications</Dropdown.Item>
        </DropdownButton>

        <DropdownButton title={<FontAwesomeIcon icon={faClipboard} />}>
          <Dropdown.Item>Mes Commandes</Dropdown.Item>
        </DropdownButton>

        <DropdownButton title={<FontAwesomeIcon icon={faUser} />}>
          <Dropdown.Item>Bonjour, David</Dropdown.Item>
          <Dropdown.Item>My DUBON</Dropdown.Item>
          <Dropdown.Item>Commandes</Dropdown.Item>
          <Dropdown.Item>Messages</Dropdown.Item>
          <Dropdown.Item>Mes Devis</Dropdown.Item>
          <Dropdown.Item>Favoris</Dropdown.Item>
          <Dropdown.Item>Compte</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Déconnexion</Dropdown.Item>
        </DropdownButton>
        
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
    </div>
  );
};

export default TopBar;
