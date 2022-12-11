import { Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import customAxios from "../../../Apis/baseAxios";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import styles from "./SignUpForm.module.css";
import VerifyOtp from "./VerifyOtp/VerifyOtp";

const InputCss = {
  width: "100%",
  marginTop: "20px",
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const SignUpForm = () => {
  const [cfHandle, setCfHandle] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setCnfPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState(null);


  const signup = async () => {

    if(cfHandle.length < 2){
      setError("Cf handle length should be atleast 2");
      return;
    }

    if(name.length < 3){
      setError("Name length should be atleast 3");
      return;
    }

    if(!validateEmail(email)){
      setError("Enter a valid email");
      return;
    }
    if(password.length < 6){
      setError("Password length should be atleast 6");
      return;
    }

    if(password != passwordConfirm){
      setError("Your password didn't match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await customAxios.post("/api/v1/users/signup", {
        handle:cfHandle,
        name,
        email,
        password,
        passwordConfirm,
      });
      console.log(res);
      localStorage.setItem("access_token", res.data.token);
      navigate("/auth/signup/verify", {
        state:{
          email,
        }
      });
    } catch (err) {
      console.log(err)
      const emsg = err.response.data.message;
      setError(emsg);
    }
    setLoading(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={styles.SignUpForm}>
            <h1>Sign up</h1>
            <p>
              Have an account?
              <Button variant="text" onClick={() => navigate("/auth/login")}>
                Login
              </Button>
            </p>

            <TextField
              label="Codeforces Handle"
              variant="outlined"
              style={InputCss}
              value={cfHandle}
              onChange={(e) => setCfHandle(e.target.value.trim())}
            />
            <TextField
              label="Name"
              variant="outlined"
              style={InputCss}
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
            />
            <TextField
              label="Email"
              variant="outlined"
              style={InputCss}
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            <TextField
              label="Password"
              variant="outlined"
              style={InputCss}
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              style={InputCss}
              value={passwordConfirm}
              onChange={(e) => setCnfPassword(e.target.value.trim())}
            />
            {error && <ErrorMessage message={error} />}
            <Button
              variant="contained"
              style={{ width: "100%", height: "50px", marginTop: "20px" }}
              onClick={signup}
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
      <Route path="/verify" element={<VerifyOtp /> } />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default SignUpForm;
