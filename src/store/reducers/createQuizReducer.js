import { createSlice } from '@reduxjs/toolkit';

export const createQuizSlice = createSlice({
  name: 'createQuiz',
  initialState: {
    quizName: '',
    quizImage: '',
    questions: [
      {
        questionNumber: 0,
        questionText: '',
        numberOfChoices: 0,
        questionImage: '',
        choices: [
          {
            choiceText: '',
            isCorrect: false
          }
        ]
      }
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
    }
  }
});

export const { addQuizName, addQuizImage, addQuestion } = createQuizSlice.actions;

export default createQuizSlice.reducer;