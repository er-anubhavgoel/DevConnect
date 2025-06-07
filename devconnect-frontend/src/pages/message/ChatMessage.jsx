import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Avatar } from "@mui/material";
import styles from "./message.module.css";

const ChatMessage = ({ message, currentUser }) => {

    const isOwnMessage = message.user?.userId === currentUser?.userId;
    console.log(message.timestamp)

    // const formatTimestamp = (timestamp) => {
    //     const date = new Date(timestamp);
    //     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };



    return (
        <div className={`${styles.messageBubble} ${isOwnMessage ? styles.sent : styles.received}`}>
            {/* Show avatar for received messages */}
            {/* {!isOwnMessage && (
                <Avatar
                    src={message.user?.profilePicture || "/assets/rectangle-logo.png"}
                    className={styles.messageAvatar}
                    sx={{ width: 32, height: 32 }}
                />
            )} */}

            <div className={styles.messageContent}>
                {/* Show image if present */}
                {message.image && (
                    <img
                        style={{ width: "100%" }}
                        src={message.image}
                        alt="Message attachment"
                        className={styles.messageImage}
                    />
                )}

                {/* Show text content */}
                {message.content && (
                    <div className={styles.messageText}>
                        <p>{message.content}</p>
                        <footer className={styles.messageTimestamp}>{formatTimestamp(message.timestamp)}</footer>

                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;