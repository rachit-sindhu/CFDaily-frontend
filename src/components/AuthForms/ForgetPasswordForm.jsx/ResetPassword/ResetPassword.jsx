import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import customAxios from "../../../../baseAxios";
import { AuthActions } from "../../../../store/reducers/auth";
import ErrorMessage from "../../../UI/ErrorMessage/ErrorMessage";
import styles from "./ResetPassword.module.css";

const InputCss = {
  width: "100%",
  marginTop: "20px",
};

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const updatePassword = async () => {
    setLoading(true);

    try {
      const res = await customAxios.patch("api/v1/users/resetPassword", {
        password,
        passwordConfirm: cnfpassword,
      });
      setError(null);
      localStorage.removeItem("token");
      dispatch(AuthActions.logout());
      navigate("/login");
    } catch (e) {
      console.log(e);
      setError(e.response.data.message);
    }

    setLoading(false);
  };

  const checkValidRoute = () => {
    //checking if user have come to route in a valid way.
    if (!location.state || !location.state.otpVerified) {
      return <Navigate to="/auth/forget/verify" />;
    }
  };

  return (
    <div className={styles.ResetPassword}>
      {checkValidRoute()}
      <h3>Forget Password</h3>
      <h1>Reset Password</h1>
      <p>Enter a new password</p>

      <TextField
        label="Password"
        variant="outlined"
        style={InputCss}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Confirm Password"
        variant="outlined"
        style={InputCss}
        value={cnfpassword}
        onChange={(e) => setCnfPassword(e.target.value)}
      />
      {error && <ErrorMessage message={error} />}
      <Button
        variant="contained"
        style={{ width: "100%", height: "50px", marginTop: "20px" }}
        onClick={updatePassword}
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

export default ResetPassword;
