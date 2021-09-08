import { configureStore } from '@reduxjs/toolkit';
import schoolReducer from '../store/reducers/schoolReducer';
import studentReducer from '../store/reducers/studentReducer';

export default configureStore({
  reducer: {
    school: schoolReducer,
    student: studentReducer
  }
});
