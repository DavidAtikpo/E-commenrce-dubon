import React from 'react';
import './CarteAnalyse.css'; // Assure-toi de créer un fichier CSS à part

const OrderCard = ({ orders, percentage, completed }) => {
  return (
    <div className="order-card">
      <div className="order-icon">
        <img src="/path-to-icon/box-icon.png" alt="Orders Icon" />
      </div>
      <div className="order-info">
        <h2>{orders}</h2>
        <p>Commandes</p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
        </div>
        <p>{percentage} percent completed.</p>
      </div>
    </div>
  );
};

export default OrderCard;
