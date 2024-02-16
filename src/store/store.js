import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import quizReducer from '../store/reducers/quizReducer';
import quizDetailsReducer from '../store/reducers/quizDetailReducer';
import createQuizReducer from './reducers/createQuizReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
    quizDetails: quizDetailsReducer,
    createQuiz: createQuizReducer
  }
});
