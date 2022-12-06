import styles from './DisplayCard.module.css';

const DisplayCard = ({children, style}) => {
    return (
        <div className={styles.DisplayContainer}>
            <div className={styles.DisplayCard}>
                {children}
            </div>
            <div className={styles.ShadowCard} style={{...style}}></div>
        </div>
    )
}

export default DisplayCard;