import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrdersPage.css';
import { API_URL } from '../../config';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate a call to fetch data from backend
    const fetchOrders = async () => {
      const { data } = await axios.get(`${ API_URL }/api/admin/orders`);
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>User ID</th>
            <th>Ordered Placed</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>
                <div className="customer-info">
                  <img src={order.customerImage} alt="customer" className="customer-image" />
                  <span>{order.customerName}</span>
                </div>
              </td>
              <td>
                <img src={order.productImage} alt="product" className="product-image" />
                <span>{order.productName}</span>
              </td>
              <td>{order.userId}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>${order.amount}</td>
              <td>
                <span className={`payment-status ${order.paymentStatus.toLowerCase()}`}>
                  {order.paymentStatus}
                </span>
              </td>
              <td>
                <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
