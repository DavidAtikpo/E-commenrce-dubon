import React from 'react';
import './analytics.css'; // Import du fichier CSS
import TotalOrders from './TotalOrders';
import TotalRevenue from './TotalRevenue';
import TopProducts from './TopProducts';
import CustomerAnalytics from './CustomerAnalytics';
import BarRevenuMois from './BarRevenuMois';
import CarteAnalyse from './CarteAnalyse';
import PiramideVente from './PiramideVente';

const AnalyticsPage = () => {
  return (
    <div className="analytics-container">
      <h1>Admin Analytics Dashboard</h1>
      <div className="analytics-section">
        <CarteAnalyse/>
        <TotalOrders />
      </div>
      <div className='analytics-section'>
      <TotalRevenue />
        <BarRevenuMois/>
        </div>
      <div className="analytics-section">
        <TopProducts />
        <CustomerAnalytics />
      </div>
      <div className="analytics-section">
      <PiramideVente/>
      </div>
    </div>
  );
};

export default AnalyticsPage;
