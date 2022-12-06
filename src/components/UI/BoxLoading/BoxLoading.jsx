import { CircularProgress } from '@mui/material';
import styles from './BoxLoading.module.css';

const BoxLoading = () => {

    return (
        <div className={styles.BoxLoading}>
            <CircularProgress />
        </div>
    )
}

export default BoxLoading;