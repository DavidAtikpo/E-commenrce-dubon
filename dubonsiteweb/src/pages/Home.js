import React from 'react';
import NavBar from '../components/NavBar'; 
import UnderNavBar from '../components/UnderNavBar';
import Main from '../components/product';
import BeforeFooter from '../components/BeforeFooter'
import Footer from '../components/Footer';


const Home = () => {
  return (
    <div>
      <NavBar />
      <UnderNavBar/>
      <Main/>
      {/* Add more content for the home page here */}
      <BeforeFooter/>
      <Footer/>
    </div>
  );
};

export default Home;
