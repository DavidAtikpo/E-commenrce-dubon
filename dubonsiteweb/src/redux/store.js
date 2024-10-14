// // src/redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from '../redux/slices/authSlice'

// const store = configureStore({
//   reducer: {
//     cart: cartReducer, // Associer le reducer cart
//   },
// });

// export default store;

// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice'; // Renommer cartReducer en authReducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Associer le reducer auth
  },
});

export default store;
