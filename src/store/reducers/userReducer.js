import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: false
  },
  reducers: {
    displayAddPanel: (state) => {
      state.value = true;
    },

    hideAddPanel: (state) => {
      state.value = false;
    }
  }
});

export const { displayAddPanel, hideAddPanel } = userSlice.actions;

export default userSlice.reducer;
