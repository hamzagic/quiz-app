import { createSlice } from '@reduxjs/toolkit';

export const schoolSlice = createSlice({
  name: 'school',
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

export const { displayAddPanel, hideAddPanel } = schoolSlice.actions;

export default schoolSlice.reducer;
