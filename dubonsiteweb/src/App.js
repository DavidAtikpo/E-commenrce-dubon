import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import AddProductPage from './components/AddProductPage';
// import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path='/addproduct' element={<AddProductPage/>}/>
          <Route path="/cart" element={<Cart />} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/adminDash' element={<AdminPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
