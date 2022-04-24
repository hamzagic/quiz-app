import { configureStore } from '@reduxjs/toolkit';
import schoolReducer from '../store/reducers/schoolReducer';
import studentReducer from '../store/reducers/studentReducer';
import staffReducer from '../store/reducers/staffReducer';
import quizReducer from '../store/reducers/quizReducer';
import quizDetailsReducer from '../store/reducers/quizDetailReducer'

export default configureStore({
  reducer: {
    school: schoolReducer,
    student: studentReducer,
    staff: staffReducer,
    quiz: quizReducer,
    quizDetails: quizDetailsReducer
  }
});
