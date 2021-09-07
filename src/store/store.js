import { configureStore } from '@reduxjs/toolkit';
import schoolReducer from '../store/reducers/schoolReducer';

export default configureStore({
  reducer: {
    school: schoolReducer
  }
});
