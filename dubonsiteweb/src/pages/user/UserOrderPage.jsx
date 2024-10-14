// UserOrdersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(`{ API_URL }/api/orders/myorders`);
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Mes commandes</h1>
      <table>
        <thead>
          <tr>
            <th>Commande</th>
            <th>Statut</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.orderItems.map(item => item.name).join(', ')}</td>
              <td>{order.status}</td>
              <td>{order.totalPrice}€</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrdersPage;
