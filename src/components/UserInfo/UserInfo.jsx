import { IconButton } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import styles from "./UserInfo.module.css";
import { useEffect, useState } from "react";
import axios from "../../baseAxios";
import BoxLoading from "../UI/BoxLoading/BoxLoading";
import { UserDataActions } from "../../store/reducers/userData";
import { useDispatch } from "react-redux";

const mapRankColor = {
  newbie: 'grey',
  pupil: 'green',
  specialist : 'cyan',
  expert: 'blue',
  'candidate master': 'violet',
  master: 'orange',
  'international master': 'orange',
  grandmaster: 'red',
  'international grandmaster': 'red',
  'legendary grandmaster': 'red',
}

const UserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  const getUserDetails = async () => {
    setLoading(true);
    const res = await axios.get("/api/v1/users/");
    setUserData(res.data.user);
    dispatch(UserDataActions.setProfile(res.data.user));
    setLoading(false);
  };

  const refreshProfile = async () => {
    setLoading(true);
    try{
      const res = await axios.patch("/api/v1/users/refresh");
      window.location.reload();
    }
    catch(e){
      //noting ig
    }
    setLoading(false);
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  

  return (
    <div className={styles.UserInfoBox}>
      {loading && <BoxLoading />}
      {!loading && (
        <>
          <h1 style={{ color: mapRankColor[userData.handle.rank] }}>
            {userData.handle.handle}, <i>{userData.handle.rank}</i>{" "}
            <IconButton onClick={refreshProfile}>
              <ReplayIcon />
            </IconButton>
          </h1>

          <table className={styles.DataTable}>
            <tr>
              <td>
                <h2 className={styles.key}>Current Rating</h2>
              </td>
              <td>
                <h2>{userData.handle.rating}</h2>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className={styles.key}>Maximum Rating</h2>
              </td>
              <td>
                <h2>{userData.handle.maxRating}</h2>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className={styles.key}>Current Streak</h2>
              </td>
              <td>
                <h2>{userData.handle.streak} days🚀</h2>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className={styles.key}>Maximum Streak</h2>
              </td>
              <td>
                <h2>{userData.handle.maxStreak}🔥</h2>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className={styles.key}>Problems Solved</h2>
              </td>
              <td>
                <h2>{userData.handle.daily.length}</h2>
              </td>
            </tr>
          </table>
        </>
      )}
    </div>
  );
};

export default UserInfo;
