
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import Admin from './routes/AdminRoute';
import store from '../src/redux/store'; // Assure-toi que ton store est bien importé

const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure the 'root' element exists in your HTML

root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
      <Admin/>
    </Provider>
  </React.StrictMode>
);


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import de Router et Routes
// import App from './App';
// import Admin from './routes/AdminRoute';
// import store from '../src/redux/store';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Router> {/* Ajout du Router ici */}
//         <Routes>
//           <Route path="/*" element={<App />} /> {/* Toutes les routes utilisateur vont dans App */}
//           <Route path="/admin/*" element={<Admin />} /> {/* Les routes d'administration */}
//         </Routes>
//       </Router>
//     </Provider>
//   </React.StrictMode>
// );
