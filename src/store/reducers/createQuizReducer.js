import { createSlice } from '@reduxjs/toolkit';

export const createQuizSlice = createSlice({
  name: 'createQuiz',
  // initialState: {},
  initialState: {
    quizName: '',
    quizImage: '',
    questions: [
      // {
      //   questionNumber: 0,
      //   questionText: '',
      //   numberOfChoices: 0,
      //   questionImage: '',
      //   choices: [],
      //   correctChoice: 0
      // }
    ],
  },
  reducers: {
    addQuizName: (state, action) => {
      state.quizName = action.payload
    },
    addQuizImage: (state, action) => {
      state.quizImage = action.payload
    },
    addQuestion: (state, action) => {
      state.questions = [...state.questions, action.payload]
    },
    addQuestionText: (state, action) => {
      state.currentQuestionText = action.payload
    },
    addNumberOfChoices: (state, action) => {
      state.numberOfChoices = action.payload
    },
    currentQuestionNumber: (state, action) => {
      state.currentQuestionNumber = action.payload
    },
    addChoices: (state, action) => {
      state.choices = action.payload
    },
    setCorrectChoiceIndex: (state, action) => {
      state.correctChoiceIndex = action.payload
    },
    resetQuestionComponent: (state, action) => {
      state.shouldReset = action.payload;
    }
  }
});

export const { 
  addQuizName, 
  addQuizImage, 
  addQuestion, 
  addQuestionText, 
  addNumberOfChoices, 
  currentQuestionNumber, 
  addChoices, 
  setCorrectChoiceIndex,
  resetQuestionComponent, 
} = createQuizSlice.actions;

export default createQuizSlice.reducer;