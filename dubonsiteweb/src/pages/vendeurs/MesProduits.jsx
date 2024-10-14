// MesProduits.js
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';

const MesProduits = () => {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Simuler un appel API pour récupérer les produits du vendeur
    fetch(`${ API_URL }/api/vendeur/produits`,{
      headers:{
        Authorization: `Bearer ${token}`

      }
    })
      .then(response => response.json())
      .then(data => setProduits(data.produits))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="mes-produits">
      <h1>Mes Produits</h1>
      {produits.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {produits.map(produit => (
              <tr key={produit._id}>
                <td>{produit.nom}</td>
                <td>{produit.description}</td>
                <td>{produit.prix} €</td>
                <td>{produit.quantite}</td>
                <td>
                  {/* <button onClick={() => handleEdit(produit._id)}>Modifier</button> */}
                  {/* <button onClick={() => handleDelete(produit._id)}>Supprimer</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun produit disponible.</p>
      )}
    </div>
  );
};

export default MesProduits;
