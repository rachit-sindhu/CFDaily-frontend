import styles from './OptionTile.module.css';

const OptionTile = ({title, icon, onClickHandler}) => {
    return (
        <div className={styles.OptionTile} onClick={() => onClickHandler()}>
            {icon}
            <h2>{title}</h2>
        </div>
    )
}

export default OptionTile;