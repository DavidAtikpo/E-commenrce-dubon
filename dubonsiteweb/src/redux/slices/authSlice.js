import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      profilePhoto: '', // Valeur par défaut
    },
  },
  reducers: {
    updateProfilePhoto: (state, action) => {
      state.profilePhoto = action.payload; // Mettre à jour le chemin de la photo
    },
  },
});

export const { updateProfilePhoto } = authSlice.actions;
export default authSlice.reducer;
