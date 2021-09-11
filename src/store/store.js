import { configureStore } from '@reduxjs/toolkit';
import schoolReducer from '../store/reducers/schoolReducer';
import studentReducer from '../store/reducers/studentReducer';
import staffReducer from '../store/reducers/staffReducer';

export default configureStore({
  reducer: {
    school: schoolReducer,
    student: studentReducer,
    staff: staffReducer,
  }
});
