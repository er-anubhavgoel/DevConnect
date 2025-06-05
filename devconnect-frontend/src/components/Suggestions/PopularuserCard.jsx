import styles from './popularusercard.module.css'
import { CardHeader, Avatar, Button } from '@mui/material'
import { red } from '@mui/material/colors'

const PopularUserCard = () => {
    return (
        <div className={styles.card}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        S
                    </Avatar>
                }
                action={
                    <Button className={styles.followButton}>
                        Follow
                    </Button>
                }
                title={<span className={styles.title}>DevConnect</span>}
                subheader={<span className={styles.subheader}>@dev_connect</span>}
            />
        </div>
    )
}

export default PopularUserCard