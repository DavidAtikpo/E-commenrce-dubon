
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../redux/slices/authSlice'; // Renommer cartReducer en authReducer

// const store = configureStore({
//   reducer: {
//     auth: authReducer, // Associer le reducer auth
//   },
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice'; 
// import cartReducer from '../redux/slices/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // cart: cartReducer,
  },
});

export default store;
