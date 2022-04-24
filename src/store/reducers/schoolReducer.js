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
    },
    displayEditPanel: (state, action) => {
      state.value = action.payload;
    },
    showData: (state, action) => {
      state.value = action.payload
    }
  }
});

export const { displayAddPanel, hideAddPanel, displayEditPanel, showData } = schoolSlice.actions;

export default schoolSlice.reducer;
