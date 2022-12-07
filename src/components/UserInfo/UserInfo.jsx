import { IconButton } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import styles from "./UserInfo.module.css";
import { useEffect, useState } from "react";
import BoxLoading from "../UI/BoxLoading/BoxLoading";

import {fetchUserDetails, refreshProfile} from '../../Apis/userApis';
import { useSelector } from "react-redux";


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
  
  const {profileData, loading} = useSelector(state => state.userData);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className={styles.UserInfoBox}>
      {(loading || !profileData) && <BoxLoading />}
      {!loading && profileData && (
        <>
          <h1 style={{ color: mapRankColor[profileData.handle.rank] }}>
            {profileData.handle.handle}, <i>{profileData.handle.rank}</i>{" "}
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
                <h2>{profileData.handle.rating}</h2>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className={styles.key}>Maximum Rating</h2>
              </td>
              <td>
                <h2>{profileData.handle.maxRating}</h2>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className={styles.key}>Current Streak</h2>
              </td>
              <td>
                <h2>{profileData.handle.streak} days🚀</h2>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className={styles.key}>Maximum Streak</h2>
              </td>
              <td>
                <h2>{profileData.handle.maxStreak}🔥</h2>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className={styles.key}>Problems Solved</h2>
              </td>
              <td>
                <h2>{profileData.handle.daily.length}</h2>
              </td>
            </tr>
          </table>
        </>
      )}
    </div>
  );
};

export default UserInfo;
