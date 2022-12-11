import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {simpleAxios as axios} from "../../../../Apis/baseAxios";
import ErrorMessage from "../../../UI/ErrorMessage/ErrorMessage";
import styles from "./VerifyOtp.module.css";
import { AuthActions } from "../../../../store/reducers/auth";

const InputCss = {
  width: "100%",
  marginTop: "20px",
};

const VerifyOtp = () => {
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const verifySignupOTP = async () => {

    setOtp(otp.trim());
    if(otp.length < 4){
      setError("enter a valid otp");
      return;
    }

    setError(null);
    setLoading(true);

    try{
      const res = await axios.post("/api/v1/users/verifyEmail", {
        otp,
        email: location.state.email,
      });

      localStorage.setItem('access_token', res.data.token);
      localStorage.setItem('refresh_token', res.data.refreshToken);
      dispatch(AuthActions.tryAutoLogin());
    }
    catch(err){
      setError(err.response.data.message);
    }

    setLoading(false);
  }

  const checkValidRoute = () => {
    //checking if user have come to route in a valid way.
    if (!location.state || !location.state.email) {
      return <Navigate to="/auth/signup/" />;
    }
  };

  return (
    <div className={styles.VerifyOtp}>
      {checkValidRoute()}
      <h3>Sign up</h3>
      <h1>OTP Verification</h1>
      <p>
        We have send you an OTP on {" "}
        <i>
          <b>{location?.state?.email && location.state.email}</b>
        </i>
        , please enter it to continue
      </p>

      <TextField
        label="Enter OTP"
        variant="outlined"
        style={InputCss}
        value={otp}
        onChange={e => setOtp(e.target.value)}
      />
      {error && <ErrorMessage message={error} />}
      <Button
        variant="contained"
        style={{ width: "100%", height: "50px", marginTop: "20px" }}
        onClick={verifySignupOTP}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress style={{ color: "primary" }} />
        ) : (
          <p>Submit</p>
        )}
      </Button>
    </div>
  );
};

export default VerifyOtp;
