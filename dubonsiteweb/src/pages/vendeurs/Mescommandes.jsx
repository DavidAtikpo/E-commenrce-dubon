// MesCommandes.js
import React, { useState, useEffect } from 'react';

const MesCommandes = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    // Simuler un appel API pour récupérer les commandes du vendeur
    fetch('/api/vendeur/commandes')
      .then(response => response.json())
      .then(data => setCommandes(data.commandes))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="mes-commandes">
      <h1>Mes Commandes</h1>
      {commandes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Prix Total</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map(commande => (
              <tr key={commande._id}>
                <td>{commande.produit.nom}</td>
                <td>{commande.quantite}</td>
                <td>{commande.prixTotal} €</td>
                <td>{new Date(commande.date).toLocaleDateString()}</td>
                <td>{commande.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune commande trouvée.</p>
      )}
    </div>
  );
};

export default MesCommandes;
