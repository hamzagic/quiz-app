import { createSlice } from '@reduxjs/toolkit';

export const quizDetailSlice = createSlice({
  name: 'quiz',
  initialState: {
    value: '',
    isEdit: false,
    currentId: ''
  },
  reducers: {
    showData: (state, action) => {
      state.value = action.payload;
    },
    isEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setId: (state, action) => {
      state.currentId = action.payload;
    }
  }
});

export const { showData, isEdit, setId } = quizDetailSlice.actions;

export default quizDetailSlice.reducer;
