import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import './AdminOrders.css';
import defaultProfile from '../../assets/images/user-profile-svgrepo-com (1).svg'

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(`${API_URL}/api/orders/all`);
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    await axios.put(`${API_URL}/api/orders/${orderId}`, { status: newStatus });
    setOrders(orders.map(order =>
      order._id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  return (
    <div>
      <h1>Gestion des commandes</h1>
      {orders.map(order => (
        <div key={order._id} className="order-box">
          {/* Entête de la commande avec photo de profil */}
          <div className="order-header" onClick={() => toggleOrderDetails(order._id)}>
            {/* Photo de profil */}
            <img
              src={order.user.name ||defaultProfile } // Remplacer par l'URL par défaut si pas d'image
              alt="Profil utilisateur"
              className="profile-picture"
            />
            <div className="order-info">
              <p><strong>Prix:</strong> {order.totalPrice}</p>
              <p><strong>Articles:</strong> {order.orderItems.length}</p>
              <p><strong>Statut:</strong> {order.isPaid}</p>
            </div>
            <div className="order-actions">
              {/* <button onClick={() => handleStatusChange(order._id, 'Validée')}>Valider</button> */}
              <button onClick={() => handleStatusChange(order._id, 'Expédiée')}>Expédier</button>
            </div>
          </div>

          {/* Affichage des détails si la boîte est ouverte */}
          {expandedOrders[order._id] && (
            <div className="order-details">
              <h4>Détails de la commande</h4>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Produit</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map(item => (
                    <tr key={item._id}>
                      <td><img src={item.image} alt={item.name} className="product-image" /></td>
                      <td>{item.name}</td>
                      <td>{item.price}cfa</td>
                      <td>{item.qty}</td>
                      <td>{(item.price * item.qty).toFixed(2)}cfa</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <h4>Adresse de livraison</h4>
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Pays</th>
                    <th>Région</th>
                    <th>Ville</th>
                    <th>Adresse</th>
                    <th>Code Postal</th>
                    <th>Numéro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.shippingAddress.name}</td>
                    <td>{order.shippingAddress.country}</td>
                    <td>{order.shippingAddress.stat}</td>
                    <td>{order.shippingAddress.city}</td>
                    <td>{order.shippingAddress.Address}</td>
                    <td>{order.shippingAddress.postalCode}</td>
                    <td>{order.shippingAddress.mobile}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminOrdersPage;
