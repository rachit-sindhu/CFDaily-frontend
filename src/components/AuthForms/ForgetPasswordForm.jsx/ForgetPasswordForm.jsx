import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import customAxios from "../../../Apis/baseAxios";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import styles from "./ForgetPassword.module.css";
import ResetPassword from "./ResetPassword/ResetPassword";
import VerifyOtp from "./VerifyOtp/VerifyOtp";

const InputCss = {
  width: "100%",
  marginTop: "20px",
};

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const requestOTP = async () => {
    setLoading(true);

    try {
      const res = await customAxios.post("/api/v1/users/forgotPassword/", {
        email,
      });
      setError(null);
      navigate("/auth/forget/verify", {
        state: {
          email,
        },
      });
    } catch (e) {
      setError(e.response.data.message);
    }

    setLoading(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={styles.ForgetPasswordForm}>
            <h1>Forget Password</h1>
            <p>
              Remember Password?{" "}
              <Button variant="text" onClick={() => navigate("/auth/login")}>
                Login
              </Button>
            </p>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={InputCss}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <ErrorMessage message={error} />}
            <Button
              variant="contained"
              style={{ width: "100%", height: "50px", marginTop: "20px" }}
              onClick={requestOTP}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress style={{ color: "primary" }} />
              ) : (
                <p>Submit</p>
              )}
            </Button>
          </div>
        }
      />
      <Route path="/verify" element={ <VerifyOtp /> } />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ForgetPasswordForm;
