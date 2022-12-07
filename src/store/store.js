import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import modalReducer from './reducers/modal';
import AuthReducer from './reducers/auth';
import UserDataReducer from './reducers/userData';
import ProblemDataReducer from './reducers/problemsData'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: AuthReducer,
    userData: UserDataReducer,
    problemsData: ProblemDataReducer,
  },
  middleware : getDefaultMiddleware({
    serializableCheck: false,
  }),
})

