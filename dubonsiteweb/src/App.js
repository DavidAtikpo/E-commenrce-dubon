import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import LoginPage from './pages/auth/LoginPage';
import AdminPage from './pages/admin/AdminPage';
import AddProductPage from './components/AddProductPage';
import ProductPage from './pages/productPage';
import Cart from './pages/Cart'
import UserDashboardLayout from './pages/user/userDashboardLayout'; // Composant renommé avec une majuscule
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPassword';
import ResetPasswordPage from './pages/auth/resetPasswordPage';
import VerifyCodePage from './pages/auth/verificationCode';
// import ProductDetail from './components/ProductDetail';
// import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user-dash" element={<UserDashboardLayout />} /> {/* Utilisation correcte */}
          <Route path="/products" element={<Products />} />
          <Route path="/productPage/:productId" element={<ProductPage />} />
          {/* <Route path="/product/:productId" element={<ProductDetail />} /> */}
          <Route path="/addproduct" element={<AddProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/adminDash" element={<AdminPage />} />
          <Route path="/cart-page" element={<Cart />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path='/verification-code' element={<VerifyCodePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
