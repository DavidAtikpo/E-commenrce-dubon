// VendeurDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const VendeurDashboard = () => {
  return (
    <div className="vendeur-dashboard">
      <h1>Tableau de Bord du Vendeur</h1>
      
      <div className="dashboard-section">
        <h2>Produits</h2>
        <p>Gérez vos produits.</p>
        <Link to="/vendeur/produits/ajouter" className="btn">Ajouter un produit</Link>
        <Link to="/vendeur/produits" className="btn">Voir mes produits</Link>
      </div>

      <div className="dashboard-section">
        <h2>Commandes</h2>
        <p>Consultez vos commandes récentes.</p>
        <Link to="/vendeur/commandes" className="btn">Voir mes commandes</Link>
      </div>
    </div>
  );
};

export default VendeurDashboard;
