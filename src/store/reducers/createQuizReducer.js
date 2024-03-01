import { createSlice } from '@reduxjs/toolkit';

export const createQuizSlice = createSlice({
  name: 'createQuiz',
  initialState: {
    quizName: '',
    quizImage: '',
    questions: [
      // {
      //   questionNumber: '',
      //   questionText: '',
      //   numberOfChoices: '',
      //   questionImage: '',
      //   choices: [],
      //   correctChoice: ''
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
      state.correctAnswerIndex = action.payload
    },
    resetQuestionComponent: (state, action) => {
      state.shouldReset = action.payload;
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(question => question.order !== action.payload) 
    },
    resetQuiz: (state) => {
      state.quizName = '';
      state.quizImage = '';
      state.questions = [];
      state.currentQuestionText = '';
      state.currentQuestionNumber = null;
      state.choices = [];
      state.correctAnswerIndex = null;
      state.shouldReset = false;
    },
    updateQuestion: (state, action) => {
      const newQuestion = state.questions.map(question => 
        question.order === action.payload.order ? {...question, 
          questionText: action.payload.questionText,
          answers: action.payload.answers,
          correctAnswerIndex: action.payload.correctAnswerIndex,
          questionImage: action.payload.questionImage
        } : question
      );
      state.questions = newQuestion;
    },
    updateQuizName: (state, action) => {
      state.quizName = action.payload
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
  deleteQuestion,
  resetQuiz,
  updateQuestion,
  updateQuizName
} = createQuizSlice.actions;

export default createQuizSlice.reducer;