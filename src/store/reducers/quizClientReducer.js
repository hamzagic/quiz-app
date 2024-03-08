import { createSlice } from '@reduxjs/toolkit';

export const quizClientSlice = createSlice({
  name: 'quizClient',
  initialState: {
    currentQuestion: '',
    currentAnswer: '',
    currentQuestionOrder: '',
    loadedQuiz: {},
    answerData: []
  },
  reducers: {
    storeLoadedQuiz: (state, action) => {
      state.loadedQuiz = action.payload;
    },
    addCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    currentAnswer: (state, action) => {
      state.currentAnswer = action.payload
    },
    setAnswerData: (state, action) => {
      const { order, answer } = action.payload;
      // if (answer.trim() === '') {
      //   return;
      // }

      const existingIndex = state.answerData.findIndex(item => item.order === order);
      if (existingIndex >= 0) {
        // Entry with the same order found, update its answer
        state.answerData[existingIndex].answer = answer;
      } else {
        // Entry with the same order not found, add a new entry
        state.answerData.push({ order, answer });
      }
    },
    resetStore: (state) => {
      state.currentQuestion = '';
      state.currentAnswer = '';
      state.loadedQuiz = {}
    }
  }
});

export const { addCurrentQuestion, storeLoadedQuiz, resetStore, currentAnswer, setAnswerData } = quizClientSlice.actions;

export default quizClientSlice.reducer;