import { createSlice } from '@reduxjs/toolkit';

export const staffSlice = createSlice({
  name: 'student',
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

export const { displayAddPanel, hideAddPanel } = staffSlice.actions;

export default staffSlice.reducer;
