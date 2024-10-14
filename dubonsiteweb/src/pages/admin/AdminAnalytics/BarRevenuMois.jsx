import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { day: 'Mon', income: 4000, expenses: 2400 },
  { day: 'Tue', income: 3000, expenses: 1398 },
  { day: 'Wed', income: 5000, expenses: 9800 },
  { day: 'Thu', income: 4780, expenses: 3908 },
  { day: 'Fri', income: 5890, expenses: 4800 },
  { day: 'Sat', income: 4390, expenses: 3800 },
  { day: 'Sun', income: 3490, expenses: 4300 },
];

const IncomeComponent = () => {
  return (
    <div className="analytics-card">
      <h2>Revenues</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#8884d8" />
          <Bar dataKey="expenses" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <h3>65,700 Fcfa</h3>
      <p>Monthly Income Growth</p>
      <p>Measure how fast you’re growing monthly recurring income.</p>
    </div>
  );
};

export default IncomeComponent;
