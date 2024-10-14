import React from 'react';

const CustomerAnalytics = () => {
  const totalCustomers = 500;

  return (
    <div className="analytics-card">
      <h2>Total Utilisateur</h2>
      <p>{totalCustomers}</p>
    </div>
  );
};

export default CustomerAnalytics;
