import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './reducers/modal';
import AuthReducer from './reducers/auth';
import UserDataReducer from './reducers/userData';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: AuthReducer,
    userData: UserDataReducer,
  },
})
