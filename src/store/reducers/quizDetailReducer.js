import { createSlice } from '@reduxjs/toolkit';

export const quizDetailSlice = createSlice({
  name: 'quiz',
  initialState: {
    value: '',
    isEdit: false
  },
  reducers: {
    showData: (state, action) => {
      state.value = action.payload;
    },
    isEdit: (state, action) => {
      state.isEdit = action.payload;
    }
  }
});

export const { showData, isEdit } = quizDetailSlice.actions;

export default quizDetailSlice.reducer;
