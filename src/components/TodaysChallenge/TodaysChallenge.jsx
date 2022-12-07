import styles from "./TodaysChallenge.module.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useSelector } from "react-redux";
import BoxLoading from "../UI/BoxLoading/BoxLoading";

const TodaysChallenge = () => {
  const {dailyChallenge} = useSelector((state) => state.problemsData);
  const {profileData} = useSelector(state => state.userData)
 
  return (
    <>
      {dailyChallenge == null  || profileData == null? (
        <BoxLoading />
      ) : (
        <div className={styles.TCContainer}>
          <h2>
            Today's Challenge, <i>{profileData.handle.rank}</i>
          </h2>
          <h1>{dailyChallenge.name}</h1>
          <div className={styles.QuestionLink}>
            <div className={styles.Link}>
              <a href={dailyChallenge.link} target="_blank"><p>Click here open question</p></a>
              <ArrowRightAltIcon />
            </div>
          </div>
          <div className={styles.Shadow}></div>
        </div>
      )}
    </>
  );
};

export default TodaysChallenge;
