import { Button, CircularProgress, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../../Apis/baseAxios";
import { AuthActions } from "../../../store/reducers/auth";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import styles from "./LoginForm.module.css";

const InputCss = {
  width: "100%",
  marginTop: "20px",
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/users/login", { email, password });
      setError(null);
      localStorage.setItem("access_token", res.data.token);
      localStorage.setItem("refresh_token", res.data.refreshToken);
      dispatch(AuthActions.tryAutoLogin());

    } catch (err) {
      console.log(err)
      const emsg = err.response.data.message;
      if(emsg == "User not verified"){
        await axios.post("/api/v1/users/sendOtp", {email});
        navigate('/auth/signup/verify', {
          state:{
            email: email,
          }
        })
      }
      else setError(emsg);
    }
    setLoading(false);
  };

  return (
    <div className={styles.LoginForm}>
      <h1>Login</h1>
      <p>
        Don't have an account?{" "}
        <Button variant="text" onClick={() => navigate("/auth/signup")}>
          SignUp
        </Button>
      </p>
      <p>
        Forgot password?{" "}
        <Button variant="text" onClick={() => navigate("/auth/forget")}>
          Forget
        </Button>
      </p>

      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        style={InputCss}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        style={InputCss}
        value={password}
        type={"password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {error && <ErrorMessage message={error} />}
      <Button
        variant="contained"
        style={{ width: "100%", height: "50px", marginTop: "20px" }}
        onClick={login}
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

export default LoginForm;
