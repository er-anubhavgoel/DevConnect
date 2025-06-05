import { Avatar } from '@mui/material'
import styles from "./middlepart.module.css"

const StoryCircle = () => {
    return (
        <div>
            <article className={styles.story}>
                <Avatar id={styles.avatar}>

                </Avatar>
                <p>DevConnect</p>
            </article>
        </div>
    )
}

export default StoryCircle
