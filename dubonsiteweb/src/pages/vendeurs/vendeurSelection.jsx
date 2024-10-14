// VendeurSelection.js
import React, { useState } from 'react';
import { API_URL } from '../../config';

const VendeurSelection = () => {
  const [isVendeur, setIsVendeur] = useState(false);

  const handleBecomeVendeur = () => {
    // Simuler l'appel API pour devenir vendeur
    setIsVendeur(true);
     const token = localStorage.getItem('token')
    // Ici tu pourrais faire un appel à ton backend pour mettre à jour l'utilisateur comme vendeur.
    fetch(`${ API_URL }/api/update-profile`, { method: 'POST', body: JSON.stringify({ role: 'vendeur' }) },{
      Headers:{
        Autorization : `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <div className="vendeur-selection">
      <h1>Devenir Vendeur</h1>
      {isVendeur ? (
        <div>
          <p>Félicitations ! Vous êtes maintenant un vendeur sur la plateforme.</p>
          {/* Tu pourrais rediriger l'utilisateur vers le dashboard vendeur ici */}
          <a href="/vendeur/dashboard">Accéder à votre tableau de bord</a>
        </div>
      ) : (
        <div>
          <p>Souhaitez-vous vendre vos produits sur notre plateforme ?</p>
          <button onClick={handleBecomeVendeur}>Devenir Vendeur</button>
        </div>
      )}
    </div>
  );
};

export default VendeurSelection;
