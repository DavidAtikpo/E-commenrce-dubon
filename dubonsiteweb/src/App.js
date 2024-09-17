import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import AddProductPage from './components/AddProductPage';
import ProductPage from './pages/productPage';
import Cart from './pages/Cart'
// import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productPage" element={<ProductPage/>}/>
          <Route path='/addproduct' element={<AddProductPage/>}/>
          <Route path="/cart" element={<Cart />} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/adminDash' element={<AdminPage/>}/>
          <Route path='/cart-page' element={<Cart/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
