import styles from './ErrorMessage.module.css';

import ErrorIcon from '@mui/icons-material/Error';
const ErrorMessage = ({message}) => {
    return(
        <p className={styles.ErrorMessage}><ErrorIcon />{message}</p>
    )
}

export default ErrorMessage;