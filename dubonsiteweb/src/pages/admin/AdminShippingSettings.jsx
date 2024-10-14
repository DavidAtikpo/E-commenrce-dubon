import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import './AdminShippingSettings.css'; // Import du fichier CSS

const AdminShippingSettings = () => {
  const [shippingRules, setShippingRules] = useState({
    type: 'fixed', // ou 'distance', 'weight'
    fixedFee: 1000,
    distanceRates: [{ maxDistance: 5, rate: 500 }, { maxDistance: 20, rate: 1000 }],
    freeShippingThreshold: 10000,
  });

  // Charger les règles actuelles depuis l'API
  useEffect(() => {
    const fetchShippingRules = async () => {
      const response = await axios.get(`${API_URL}/api/shipping-rules`);
      setShippingRules(response.data);
    };
    fetchShippingRules();
  }, []);

  const handleSave = async () => {
    await axios.post(`${API_URL}/api/admin/shipping-rules`, { shippingRules });
    alert('Règles de livraison mises à jour');
  };

  return (
    <div className="admin-shipping-settings-container">
      <h2>Paramètres de frais de livraison</h2>

      <label>Type de frais</label>
      <select value={shippingRules.type} onChange={e => setShippingRules({ ...shippingRules, type: e.target.value })}>
        <option value="fixed">Frais fixes</option>
        <option value="distance">En fonction de la distance</option>
        <option value="weight">En fonction du poids</option>
      </select>

      {shippingRules.type === 'fixed' && (
        <div>
          <label>Frais fixes :</label>
          <input
            type="number"
            value={shippingRules.fixedFee}
            onChange={e => setShippingRules({ ...shippingRules, fixedFee: e.target.value })}
          />
        </div>
      )}

      {shippingRules.type === 'distance' && (
        <div>
          <label>Tarifs par distance</label>
          {shippingRules.distanceRates.map((rate, index) => (
            <div key={index} className="distance-rate">
              <label>Jusqu'à {rate.maxDistance} km :</label>
              <input
                type="number"
                value={rate.rate}
                onChange={e => {
                  const newRates = [...shippingRules.distanceRates];
                  newRates[index].rate = e.target.value;
                  setShippingRules({ ...shippingRules, distanceRates: newRates });
                }}
              />
            </div>
          ))}
        </div>
      )}

      <button onClick={handleSave}>Sauvegarder</button>
    </div>
  );
};

export default AdminShippingSettings;
