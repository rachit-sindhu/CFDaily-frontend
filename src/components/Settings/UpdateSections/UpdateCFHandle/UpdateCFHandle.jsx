import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import axios from "../../../../Apis/baseAxios";
import ErrorMessage from "../../../UI/ErrorMessage/ErrorMessage";
import styles from "../UpdateStyle.module.css";

const UpdateCFHandle = ({ closeButton }) => {
  const [CfHandle, setCfHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCfHandle = async () => {

    if(CfHandle.length < 2){
      setError("Cf handle length should be atleast 2");
      return;
    }

    setLoading(true);
    setError(null);

    try{
      const res = await axios.post('/api/v1/users/addHandle/',{
        handle: CfHandle,
      });
      window.location.reload(); //reloading page bcause calender might change
    }
    catch(err){
      const emsg = err.response.data.message;
      setError(emsg);
    }
    setLoading(false);
  };

  return (
    <div className={styles.Update}>
      <div className={styles.Heading}>
        <h1>Update Codeforces Handle</h1>
        {closeButton}
      </div>
      <div className={styles.Form}>
        <input
          placeholder="Enter your cf handle"
          value={CfHandle}
          onChange={(e) => setCfHandle(e.target.value.trim())}
        />
        {error && <ErrorMessage message={error} />}
        <Button
          variant="contained"
          style={{ width: "100%", height: "50px", marginTop: "20px" }}
          onClick={updateCfHandle}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress style={{ color: "primary" }} />
          ) : (
            <p>Submit</p>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UpdateCFHandle;
