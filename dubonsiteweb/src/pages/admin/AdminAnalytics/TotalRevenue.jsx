import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4000 },
];

const TotalRevenue = () => {
  return (
    <div className="analytics-card">
      <h2>Total Revenue</h2>
      <BarChart width={300} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TotalRevenue;
