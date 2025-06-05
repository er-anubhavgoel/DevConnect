import styles from "./userreelcard.module.css";

const UserReelCard = () => {
    return (
        <div className={styles.reelCard}>
            <video
                src="https://cdn.pixabay.com/video/2024/12/26/248879_tiny.mp4"
                className={styles.video}
                // autoPlay
                loop
                playsInline
                controls={true}
            />
        </div>
    );
};

export default UserReelCard;
