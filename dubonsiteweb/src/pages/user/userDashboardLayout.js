import React from 'react';
import TopBar from '../../components/userTopBar';  // Importez votre composant TopBar ici.
import '../../styles/pages/userDashboardLayout.css'; // Ajoutez un fichier CSS pour la mise en page du dashboard.

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      {/* Top Bar */}
      <TopBar />
      
      {/* Structure du dashboard */}
      <div className="dashboard-content">
        {/* Menu latéral */}
        <aside className="sidebar">
          <nav>
            <ul>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/dashboard/commandes">Commandes</a></li>
              <li><a href="/dashboard/messages">Messages</a></li>
              <li><a href="/dashboard/profil">Profil</a></li>
              <li><a href="/dashboard/deconnexion">Déconnexion</a></li>
            </ul>
          </nav>
        </aside>

        {/* Contenu principal */}
        <main className="main-content">
          {children} {/* Ici, les pages spécifiques au tableau de bord seront rendues */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
