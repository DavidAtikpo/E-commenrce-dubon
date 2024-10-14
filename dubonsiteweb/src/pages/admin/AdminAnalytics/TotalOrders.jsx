import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', orders: 400 },
  { name: 'Feb', orders: 300 },
  { name: 'Mar', orders: 500 },
  { name: 'Apr', orders: 600 },
];

const TotalOrders = () => {
  return (
    <div className="analytics-card">
      <h2>Total Commande </h2>
      <LineChart width={300} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default TotalOrders;
