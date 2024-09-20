import React from 'react';
import TopBar from '../../components/userTopBar';  // Importez votre composant TopBar ici.
import CategoryNavigationBar from '../../components/categoriNavBar';
import NewProducts from '../../components/newProduct';
// import '../../styles/pages/userDashboardLayout.css'; // Ajoutez un fichier CSS pour la mise en page du dashboard.

const userDashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      {/* Top Bar */}
      <TopBar />
      
      {/* Structure du dashboard */}
      <div className="dashboard-content">
        {/* Contenu principal */}
        <main className="main-content">
          <NewProducts/>
          <CategoryNavigationBar/>
          {children} {/* Ici, les pages spécifiques au tableau de bord seront rendues */}
        </main>
      </div>
    </div>
  );
};

export default userDashboardLayout;
