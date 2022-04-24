import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
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

export const { displayAddPanel, hideAddPanel } = quizSlice.actions;

export default quizSlice.reducer;
