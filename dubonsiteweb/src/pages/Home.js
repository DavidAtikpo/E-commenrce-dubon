import React from 'react';
import NavBar from '../components/NavBar'; 
import UnderNavBar from '../components/UnderNavBar';
import Main from '../components/Main';
import BeforeFooter from '../components/BeforeFooter'
import Footer from '../components/Footer';


const Home = () => {
  return (
    <div>
      <NavBar />
      <UnderNavBar/>
      <h1>Welcome to the Home Page</h1>
      <Main/>
      {/* Add more content for the home page here */}
      <BeforeFooter/>
      <Footer/>
    </div>
  );
};

export default Home;
