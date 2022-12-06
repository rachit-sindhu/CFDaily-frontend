import Spinner from "./Spinner/Spinner";
import styles from "./SubmitButton.module.css";

const SubmitButton = ({ cssStyles, text, loading, onClick, disable }) => {
  return (
    <div
      className={styles.SubmitButton}
      style={{
        ...cssStyles,
        backgroundColor: `${disable ? "grey" : "palevioletred"}`,
        cursor: `${disable ? "auto" : "pointer"}`
      }}
      onClick={() => (disable ? {} : onClick())}
    >
      {loading ? <Spinner /> : <h3>{text}</h3>}
    </div>
  );
};

export default SubmitButton;
