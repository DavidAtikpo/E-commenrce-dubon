import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faShoppingCart, faClipboardList, faExchangeAlt, faList, faCog,faSearchDollar } from '@fortawesome/free-solid-svg-icons';
import './MessageSideBar.css'; // Import du fichier CSS


const MessageSideBar = ({ onMenuClick }) => {
  return (
   
     
    <div className="sidebar">
      <ul>
        <li onClick={() => onMenuClick('accueil')}>
          <FontAwesomeIcon icon={faHome} /> Accueil
        </li>
        <li onClick={() => onMenuClick('messages')}>
          <FontAwesomeIcon icon={faEnvelope} /> Messages
        </li>
        <li onClick={() => onMenuClick('achat-prospects')}>
          <FontAwesomeIcon icon={faShoppingCart} /> Achat de prospects
        </li>
        <li onClick={() => onMenuClick('commandes')}>
          <FontAwesomeIcon icon={faClipboardList} /> Commandes
        </li>
        <li onClick={() => onMenuClick('transactions')}>
          <FontAwesomeIcon icon={faExchangeAlt} /> Transactions
        </li>
        <li onClick={() => onMenuClick('contacts')}>
          <FontAwesomeIcon icon={faSearchDollar} /> Devenz vendeur
        </li>
        <li onClick={() => onMenuClick('listes')}>
          <FontAwesomeIcon icon={faList} /> Mes Listes
        </li>
        <li onClick={() => onMenuClick('services')}>
          <FontAwesomeIcon icon={faCog} /> Services
        </li>
      </ul>
    </div>
  );
};

export default MessageSideBar;
