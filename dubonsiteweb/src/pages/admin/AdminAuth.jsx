import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorToken, setTwoFactorToken] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('/api/auth/register', { email, password });
      alert('User registered successfully');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);

      // Demander le 2FA après la connexion réussie
      const res = await axios.post('/api/auth/generate-2fa', {}, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      console.log(res.data.qrCode); // Afficher le QR code pour configurer 2FA
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handle2FAVerify = async () => {
    try {
      await axios.post('/api/auth/verify-2fa', { token: twoFactorToken });
      alert('2FA verified successfully');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>

      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>

      <h2>Verify 2FA</h2>
      <input type="text" value={twoFactorToken} onChange={(e) => setTwoFactorToken(e.target.value)} placeholder="2FA Token" />
      <button onClick={handle2FAVerify}>Verify 2FA</button>
    </div>
  );
};

export default AuthForm;
