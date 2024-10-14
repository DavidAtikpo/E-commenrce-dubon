
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import Admin from './routes/AdminRoute';
import store from '../src/redux/store'; // Assure-toi que ton store est bien importé

const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure the 'root' element exists in your HTML

root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Ajout du Provider autour de App */}
      <App />
      <Admin/>
    </Provider>
  </React.StrictMode>
);

