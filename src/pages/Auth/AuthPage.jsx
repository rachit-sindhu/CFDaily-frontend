import AuthForm from "../../components/AuthForms/AuthForm";
import LandingIntro from "../../components/LandingIntro/LandingIntro";

import styles from "./AuthPage.module.css";

const AuthPage = () => {

  return (
    <div className={styles.Container}>
      <div className={styles.Image}>
        <LandingIntro />
      </div>
      <div className={styles.Form}>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
