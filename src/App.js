import AuthPage from './pages/Auth/AuthPage'
import HomePage from './pages/HomePage/HomePage';
import './index.css';

import {Routes, Route, Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import {AuthActions} from './store/reducers/auth'
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthActions.tryAutoLogin());
  },[])

  const token = useSelector(state => state.auth.token);
  const haveAccessToken = token !== null;

  return (
    <Routes>
      <Route path='/auth/*' element={haveAccessToken ? <Navigate to="/home"/> : <AuthPage />}/>
      <Route path='/home' element={!haveAccessToken ? <Navigate to="/auth"/>: <HomePage />}></Route>
      <Route path="/*" element={<Navigate to="/auth"/>} />
    </Routes>
  );
}

export default App;
