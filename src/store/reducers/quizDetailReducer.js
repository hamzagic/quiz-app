import { createSlice } from '@reduxjs/toolkit';

export const quizDetailSlice = createSlice({
  name: 'quiz',
  initialState: {
    value: ''
  },
  reducers: {
    showData: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { showData } = quizDetailSlice.actions;

export default quizDetailSlice.reducer;
