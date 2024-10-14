import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const data = [
  { name: 'Product 1', value: 400 },
  { name: 'Product 2', value: 300 },
  { name: 'Product 3', value: 300 },
  { name: 'Product 4', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TopProducts = () => {
  return (
    <div className="analytics-card">
      <h2>Top Products</h2>
      <PieChart width={300} height={200}>
        <Pie
          data={data}
          cx={150}
          cy={100}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default TopProducts;
