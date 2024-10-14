import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const SalesComponent = () => {
  const [salesData, setSalesData] = useState([]);

  // Appel à l'API backend pour récupérer les données de ventes
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('/api/sales-data'); // Remplace '/api/sales-data' par ton endpoint réel
        setSalesData(response.data); // Assurez-vous que la structure des données correspond à celle du graphique
      } catch (error) {
        console.error('Erreur lors de la récupération des données de ventes', error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="analytics-card">
      <h2>Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <h3>95,82,500Fcfa</h3> {/* Remplacez cette valeur avec les données réelles */}
      <p>Vente Mensuel</p>
      <p>Measure how fast you’re growing monthly recurring sales.</p>
    </div>
  );
};

export default SalesComponent;
