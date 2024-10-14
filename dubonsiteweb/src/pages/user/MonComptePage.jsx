import React from 'react';
import EmailUpdateComponent from '../../components/MonCompte/EmailUpdateComponent';
// import PasswordUpdateComponent from '../../components/MonCompte/PasswordUpdateComponent';
import PhoneVerificationComponent from '../../components/MonCompte/PhoneVerificationComponent';
import ProfilePhotoComponent from '../../components/MonCompte/ProfilePhotoComponent';
// import TopBar from '../../components/topbar/TopBar'
import TransactionHistoryComponent from '../../components/MonCompte/TransactionHistoryComponent';

const AccountPage = () => {
  return (
    <div>
      <h1>Gérer votre compte</h1>
      <EmailUpdateComponent />
      {/* <PasswordUpdateComponent /> */}
      <PhoneVerificationComponent />
      <ProfilePhotoComponent />
      <TransactionHistoryComponent />
    </div>
  );
};

export default AccountPage;
