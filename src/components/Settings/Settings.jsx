import { useDispatch, useSelector } from "react-redux";
import styles from "./Settings.module.css";

import { ModalAction } from "../../store/reducers/modal";
import { AuthActions } from "../../store/reducers/auth";
import OptionTile from "./OptionTile/OptionTile";

import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PatternIcon from "@mui/icons-material/Pattern";
import { useState } from "react";
import { IconButton } from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import UpdateCFHandle from "./UpdateSections/UpdateCFHandle/UpdateCFHandle";

const Settings = () => {
  const showSettings = useSelector((state) => state.modal.showSettings);
  const dispatch = useDispatch();

  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(1);

  const closeButton = (
    <IconButton onClick={() => setShowUpdateBox(false)}>
      <CancelIcon fontSize="large" />
    </IconButton>
  );

  return (
    <>
      {showSettings && (
        <div
          className={styles.Backdrop}
          onClick={() => dispatch(ModalAction.hideSettingsModal())}
        ></div>
      )}
      <div className={[styles.Settings, showSettings && styles.Show].join(" ")}>
        <h1 className={styles.Heading}>Settings</h1>
        <OptionTile
          title={"Update CF Handle"}
          icon={<AlternateEmailIcon fontSize="large" />}
          onClickHandler={() =>  setShowUpdateBox(true)}
        />
        <OptionTile
          title={"Logout"}
          icon={<LogoutIcon fontSize="large" />}
          onClickHandler={() => {
            dispatch(ModalAction.hideSettingsModal());
            dispatch(AuthActions.logout());
          }}
        />

        {/*here we are showing the box where user can enter their details */}
        <div
          className={[
            styles.UpdateBox,
            showUpdateBox && styles.ShowUpdateBox,
          ].join(" ")}
        >
          <UpdateCFHandle closeButton={closeButton} />
        </div>
      </div>
    </>
  );
};

export default Settings;
