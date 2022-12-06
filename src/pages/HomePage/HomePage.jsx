import { useDispatch } from "react-redux";
import Calender from "../../components/Calender/Calender";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import Settings from "../../components/Settings/Settings";
import TodaysChallenge from "../../components/TodaysChallenge/TodaysChallenge";
import UserInfo from "../../components/UserInfo/UserInfo";
import styles from "./HomePage.module.css";

import { ModalAction } from "../../store/reducers/modal";
import { useEffect } from "react";
import SettingsIcon from '@mui/icons-material/Settings';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
  }, []);

  return (
    <div className={styles.Container}>
      <div className={styles.Backfill}></div>
      <div className={styles.Elements}>
        <div className={styles.Nav}>
            <div className={styles.UserLogo} onClick={() => dispatch(ModalAction.showSettingsModal())}>
              <SettingsIcon />
            </div>
        </div>
        <h1 className={styles.Title}>CF Daily</h1>
        <div className={styles.TopLayer}>
          <DisplayCard style={{backgroundColor:"#FA9B99"}}>
            <UserInfo />
          </DisplayCard>
          <DisplayCard style={{backgroundColor:"#A08BF2"}}>
            <Calender />
          </DisplayCard>
        </div>
        <TodaysChallenge />
        <Settings/>
      </div>
    </div>
  );
};

export default HomePage;
