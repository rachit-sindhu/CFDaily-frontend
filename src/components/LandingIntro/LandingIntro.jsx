import { Button } from "@mui/material";
import styles from "./LandingIntro.module.css";

const LandingIntro = () => {
  return (
    <div className={styles.LandingIntro}>
      <div className={styles.Content}>
        <h2>CF Daily</h2>
        {/* <video src='https://youtu.be/-6PZ8E0AcIs' width="80%" height="50%" controls autoPlay></video> */}
        <div>
            <h1 className={styles.TagLine}>
                Start your problem solving journey with us🚀
            </h1>
            <a href="https://youtu.be/tphHCoBiQWE" target="_blank">
            <Button  variant="contained">Demo</Button>
            </a>
        </div>
      </div>
    </div>
  );
};

export default LandingIntro;
