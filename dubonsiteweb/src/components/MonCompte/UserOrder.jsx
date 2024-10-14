import React, { useEffect, useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../config'; // Modifier l'URL si nécessaire
import './UserOrders.css'; // Import du fichier CSS

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Appeler l'API pour récupérer les commandes de l'utilisateur
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // Supposons que le token est stocké dans localStorage
        const response = await axios.get(`${API_URL}/api/user/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes utilisateur :', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <CircularProgress className="loading-spinner" />;
  }

  return (
    <div className="user-orders-container">
      <Typography variant="h4" className="user-orders-title">
        Mes Commandes
      </Typography>

      {orders.length > 0 ? (
        <TableContainer component={Paper} className="user-orders-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Numéro de commande</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.total.toFixed(2)} Fcfa</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Vous n'avez pas encore passé de commandes.
        </Typography>
      )}
    </div>
  );
};

export default UserOrders;
