// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ProfilePhoto.css';
// import EmailUpdateComponent from '../MonCompte/EmailUpdateComponent';
// import PasswordUpdateComponent from '../MonCompte/PasseWord';

// const AccountComponent = () => {
//   const [userData, setUserData] = useState({
//     memberId: '',
//     email: '',
//     phone: ''
//   });

//   const [activeSection, setActiveSection] = useState('profile');

//   // Récupérer les informations de l'utilisateur depuis le backend
//   useEffect(() => {
//     axios.get('http://192.168.1.69/api/user/account-info') // Remplace par ton endpoint
//       .then(response => {
//         const { memberId, email, phone } = response.data;
//         setUserData({ memberId, email, phone });
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération des données :', error);
//       });
//   }, []);

//   // Gérer le changement de section
//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//   };

//   // Rendu conditionnel basé sur la section active
//   const renderActiveSection = () => {
//     switch (activeSection) {
//       case 'profile':
//         return (
//           <div>
//             <h2>Mon Profil</h2>
//             <p>Votre identifiant de membre : <strong>{userData.memberId}</strong></p>
//             <p>Email : <strong>{userData.email.replace(/(.{3}).*(@.*)/, '$1***$2')}</strong></p>
//             <p>Téléphone : <strong>{userData.phone || 'Non renseigné'}</strong></p>
//           </div>
//         );
//       case 'member-profile':
//         return (
//           <div>
//             <h2>Profil de membre</h2>
//             <p>Informations relatives au profil de membre.</p>
//           </div>
//         );
//       case 'change-email':
//         return <EmailUpdateComponent />; // Affichage du composant EmailUpdateComponent
//       case 'change-password':
//         return <PasswordUpdateComponent />; // Affichage du composant PasswordUpdateComponent
//       case 'manage-phones':
//         return (
//           <div>
//             <h2>Gérer Vérification Téléphones</h2>
//             <p>Informations pour la gestion des téléphones.</p>
//           </div>
//         );
//       case 'transaction-center':
//         return (
//           <div>
//             <h2>Mon centre de transactions</h2>
//             <p>Historique des transactions.</p>
//           </div>
//         );
//       default:
//         return <div>Sélectionnez une option dans le menu.</div>;
//     }
//   };

//   return (
//     <div className="account-component">
//       <div className="header">
//         <div className="profile-picture">
//           <button onClick={() => handleSectionChange('upload-photo')}>Transférer la photo</button>
//         </div>
//         <div className="user-info">
//           <p>Votre identifiant de membre : <strong>{userData.memberId}</strong></p>
//           <p>Email : 
//             <strong>{userData.email.replace(/(.{3}).*(@.*)/, '$1***$2')}</strong>
//             <button onClick={() => handleSectionChange('change-email')}>Changer d'adresse électronique</button>
//           </p>
//           <p>Téléphone portable rattaché : 
//             {userData.phone ? (
//               <strong>{userData.phone}</strong>
//             ) : (
//               <button onClick={() => handleSectionChange('manage-phones')}> Saisir un numéro de téléphone portable</button>
//             )}
//           </p>
//         </div>
//       </div>

//       <div className="sections">
//         <div className="section">
//           <h3>Renseignements personnels</h3>
//           <ul>
//             <li><button onClick={() => handleSectionChange('profile')}>Mon Profil</button></li>
//             <li><button onClick={() => handleSectionChange('member-profile')}>Profil de membre</button></li>
//             <li><button onClick={() => handleSectionChange('upload-photo')}>Télécharger Ma Photo</button></li>
//           </ul>
//         </div>

//         <div className="section">
//           <h3>Compte de Sécurité</h3>
//           <ul>
//             <li><button onClick={() => handleSectionChange('change-email')}>Changement d'adresse E-mail</button></li>
//             <li><button onClick={() => handleSectionChange('change-password')}>Changer Mot de Passe</button></li>
//             <li><button onClick={() => handleSectionChange('manage-phones')}>Gérer Vérification Téléphones</button></li>
//           </ul>
//         </div>

//         <div className="section">
//           <h3>Compte de Financement</h3>
//           <ul>
//             <li><button onClick={() => handleSectionChange('transaction-center')}>Mon centre de transactions</button></li>
//           </ul>
//         </div>
//       </div>

//       <div className="content">
//         {renderActiveSection()} {/* Affiche le contenu correspondant à la section active */}
//       </div>
//     </div>
//   );
// };

// export default AccountComponent;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountPage.css';
import TopBar from '../topbar/TopBar'
import Footer from '../Footer';
import BeforeFooter from '../BeforeFooter';

const AccountPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Redirection vers le composant connecté à la route
  };

  return (
    <div>
    <TopBar/>
    <div className="account-page">
      <div className="account-header">
        <div className="profile-section">
          <img src="/path/to/default-avatar.png" alt="avatar" className="avatar" />
          <button className="photo-button">Transférer la photo</button>
        </div>
        <div className="account-info">
          <p><strong>Votre identifiant de membre :</strong> tg29074983370iubp</p>
          <p><strong>E-mail :</strong> dav***@gmail.com <button className="change-link" onClick={() => handleNavigation('/change-email')}>Changer d’adresse électronique</button></p>
          <p><strong>Téléphone portable rattaché :</strong> <span className="phone-placeholder" onClick={() => handleNavigation('/add-phone')}>Saisir un numéro de téléphone portable</span></p>
        </div>
      </div>

      <div className="account-menu">
        <div className="menu-column">
          <h4>Renseignements personnels</h4>
          <ul>
            <li onClick={() => handleNavigation('/profile')}>mon Profil</li>
            <li onClick={() => handleNavigation('/orders')}>Les commandes</li>
            <li onClick={() => handleNavigation('/upload-photo')}>télécharger Mon Photo</li>
            <li onClick={() => handleNavigation('/privacy-settings')}>Paramètre de confidentialité</li>
            <li onClick={() => handleNavigation('/messaging-services')}>Services de messagerie</li>
            <li onClick={() => handleNavigation('/tax-info')}>Renseignements fiscaux</li>
            <li onClick={() => handleNavigation('/data-preferences')}>Préférences de données</li>
          </ul>
        </div>

        <div className="menu-column">
          <h4>Compte de Sécurité</h4>
          <ul>
            <li onClick={() => handleNavigation('/email')}>changement D’adresse E-mail</li>
            <li onClick={() => handleNavigation('/password')}>changer Mot de Passe</li>
            <li onClick={() => handleNavigation('/phone')}>gérer Vérification Téléphones</li>
            <li onClick={() => handleNavigation('/connected-accounts')}>Gérer mes comptes connectés</li>
          </ul>
        </div>

        <div className="menu-column">
          <h4>Compte de financement</h4>
          <ul>
            <li onClick={() => handleNavigation('/transaction')}>Mon centre de transactions</li>
          </ul>
        </div>
      </div>
    </div>
    <BeforeFooter/>
    <Footer/>
    </div>
  );
};

export default AccountPage;
