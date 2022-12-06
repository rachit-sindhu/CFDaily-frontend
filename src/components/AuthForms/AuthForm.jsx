import LoginForm from './LoginForm/LoginForm';
import styles from './AuthForm.module.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUpForm from './SignUpForm/SignUpForm';
import ForgetPasswordForm from './ForgetPasswordForm.jsx/ForgetPasswordForm';

const AuthForm = () => {
    return (
        <div className={styles.AuthForm}>
            <div className={styles.Space}></div>
            <Routes>
                <Route path='/login' element={<LoginForm />} />
                <Route path='/signup/*' element={<SignUpForm />} />
                <Route path='/forget/*' element={<ForgetPasswordForm />} />
                <Route path='/*' element={<Navigate to="/auth/login"/>} />
            </Routes>
        </div>
    );
}

export default AuthForm;