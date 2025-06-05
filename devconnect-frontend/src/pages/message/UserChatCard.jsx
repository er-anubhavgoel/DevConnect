import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styles from "./userChatCard.module.css";
import { useSelector } from 'react-redux';

const UserChatCard = ({ chat }) => {

    const { auth } = useSelector(store => store)

    // console.log("Login User---->",auth?.user?.userId);
    // console.log("Chat User--->",chat.users[0].userId);

    return (
        <Card className={styles.card} sx={{ bgcolor: "transparent" }}>
            <CardHeader
                className={styles.cardHeader}
                avatar={
                    <Avatar sx={{ width: "2rem", height: "2rem" }} src="/assets/avatar.png" />
                }
                action={
                    <IconButton>
                        <MoreHorizIcon sx={{ color: "pink" }} />
                    </IconButton>
                }
                title={<span className={styles.title}>
                    {auth?.user?.userId === chat.users[1].userId
                        ? chat.users[0].firstName + " " + chat.users[0].lastName
                        : chat.users[1].firstName + " " + chat.users[1].lastName}</span>}
            // subheader={<span className={styles.subheader}>New Message</span>}
            />
        </Card>
    )
}

export default UserChatCard
