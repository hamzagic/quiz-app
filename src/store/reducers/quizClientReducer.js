import { createSlice } from '@reduxjs/toolkit';

export const quizClientSlice = createSlice({
  name: 'quizClient',
  initialState: {
    currentQuestion: '',
    loadedQuiz: {}
  },
  reducers: {
    storeLoadedQuiz: (state, action) => {
      state.loadedQuiz = action.payload;
    },
    addCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    }
  }
});

export const { addCurrentQuestion, storeLoadedQuiz } = quizClientSlice.actions;

export default quizClientSlice.reducer;