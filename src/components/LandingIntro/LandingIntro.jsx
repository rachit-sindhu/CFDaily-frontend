import styles from './LandingIntro.module.css';

const LandingIntro = () => {
    return (
        <div className={styles.LandingIntro}>
            <div className={styles.Content}>
                <h2>CF Daily</h2>

                <h1 className={styles.TagLine}>Start your problem solving journey with us🚀</h1>
            </div>
        </div>
    )
}

export default LandingIntro;