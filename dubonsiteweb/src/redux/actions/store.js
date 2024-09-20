import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Assurez-vous que le chemin est correct

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
