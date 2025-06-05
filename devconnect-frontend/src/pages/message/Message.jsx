import { Avatar, Grid, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SearchUser from "../../components/SearchUser/SearchUser";
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import styles from "./message.module.css";
import { useNavigate } from "react-router-dom";
import UserChatCard from "./UserChatCard";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Message/message.action";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import ChatMessage from "./ChatMessage";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Message = () => {
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const chatContainerRef = useRef(null);  // To auto-scroll chat on sending message

    const { auth, message } = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelectImage = async (e) => {
        setLoading(true);
        console.log("handleSelectImage", e.target.files);
        try {
            const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
            setSelectedImage(imgUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeToHome = () => {
        navigate("/");
    };

    useEffect(() => {
        dispatch(getAllChats());
    }, [dispatch]);

    const handleCreateMessage = (value) => {
        if (!value.trim() && !selectedImage) return;

        const messageData = {
            chatId: currentChat.id,
            content: value.trim(),
            image: selectedImage
        };

        dispatch(createMessage({ messageData, sendMessageToServer }));
        setMessageInput("");
        setSelectedImage(null);
    };

    const handleChatSelection = (chat) => {
        setCurrentChat(chat);
        setMessages(chat.messages || []);
    };

    const getOtherUser = (chat) => {
        if (!chat?.users || chat.users.length === 0) return null;
        return chat.users.find(user => user.userId !== auth?.user?.userId) || chat.users[0];
    };

    const otherUser = currentChat ? getOtherUser(currentChat) : null;

    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const sock = new SockJS("http://localhost:5454/ws");
        const stomp = Stomp.over(sock);
        stomp.debug = () => { };
        setStompClient(stomp);

        stomp.connect({}, onConnect, onErr)
    }, [])

    const onConnect = () => {
        console.log("WebSocket Connected...");
    }

    const onErr = (error) => {
        console.log("Error Occurred...", error);
    }

    useEffect(() => {
        if (stompClient && auth.user && currentChat) {
            console.log("Chat ID----->", currentChat.id);
            const subscription = stompClient.subscribe(`/user/${currentChat.id}/private`, onMessageReceived);
            return () => {
                if (subscription) {
                    subscription.unsubscribe();
                }
            };
        }
    }, [stompClient, auth.user, currentChat])

    const sendMessageToServer = (newMessage) => {
        if (stompClient && newMessage) {
            stompClient.send(`/app/chat/${currentChat.id.toString()}`, {}, JSON.stringify(newMessage))
        }
    }

    const onMessageReceived = (payload) => {
        const receivedMessage = JSON.parse(payload.body)
        console.log("Message Received from webSocket------->", receivedMessage);
        setMessages(prevMessages => [...prevMessages, receivedMessage]);
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages])

    return (
        <div className={styles.messageContainer}>
            <Grid container className={styles.messageContainer} sx={{
                maxWidth: '100%',
                width: '100%',
                margin: 0,
                padding: 0,
                '&.MuiGrid-container': {
                    width: '100%',
                    maxWidth: 'none'
                }
            }}>

                {/* Left Sidebar */}
                <Grid item xs={3} className={styles.messageSidebar}>
                    <div className={styles.messageSidebarHeader} onClick={handleChangeToHome}>
                        <HomeIcon />
                        <h1>Home</h1>
                    </div>

                    <div className={styles.searchSection}>
                        <SearchUser />
                    </div>

                    <div className={styles.userList}>
                        <div class="sidebar-content">
                            {message.chats?.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        handleChatSelection(item)
                                    }
                                    }
                                    className={styles.userListItem}
                                >
                                    <UserChatCard chat={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>

                {/* Right Panel - Chat Area */}
                <Grid item xs={9} className={styles.chatPanel}>
                    {/* Chat Header */}
                    <div className={styles.chatHeader}>
                        <div className={styles.profileName}>
                            <Avatar src={otherUser?.profilePicture || "/assets/avatar.png"} />
                            <span style={{ marginLeft: '0.75rem' }}>
                                {otherUser
                                    ? `${otherUser.firstName} ${otherUser.lastName}`
                                    : "Select a chat"
                                }
                            </span>
                        </div>
                        {currentChat && (
                            <div className={styles.actions}>
                                <IconButton color="inherit"><CallIcon /></IconButton>
                                <IconButton color="inherit"><VideocamIcon /></IconButton>
                            </div>
                        )}
                    </div>

                    {/* Messages Display */}
                    <div className={styles.messagesContainer} style={{ minHeight: "25rem" }}>
                        {currentChat ? (
                            <div
                                ref={chatContainerRef}
                                style={{ minHeight: "25rem" }}
                                className={styles.messagesDisplay}>
                                {messages.map((msg) => (
                                    <ChatMessage
                                        key={msg.id}
                                        message={msg}
                                        currentUser={auth?.user}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.messagesDisplay} style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "burlywood",
                                fontSize: "2rem",
                                minHeight: "118%"
                            }}>
                                <ChatBubbleOutlineIcon sx={{ fontSize: "10rem" }} />
                                <p>No Chat Selected</p>
                            </div>
                        )}
                    </div>

                    {/* Input Section */}
                    {currentChat && (
                        <div className={styles.messageInputSection}>
                            <input
                                type="text"
                                placeholder="Type message..."
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter" && (messageInput.trim() || selectedImage)) {
                                        handleCreateMessage(messageInput);
                                    }
                                }}
                            />

                            <input
                                type="file"
                                accept="image/*"
                                id="image-input"
                                onChange={handleSelectImage}
                                style={{ display: 'none' }}
                                disabled={loading}
                            />

                            <label htmlFor="image-input" className={styles.imageUploadLabel}>
                                <IconButton
                                    component="span"
                                    disabled={loading}
                                    sx={{
                                        color: loading ? 'gray' : 'inherit',
                                        cursor: loading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <AddPhotoAlternateIcon />
                                </IconButton>
                            </label>

                            <button
                                onClick={() => handleCreateMessage(messageInput)}
                                className={styles.messageSendButton}
                                disabled={loading || (!messageInput.trim() && !selectedImage)}
                                style={{
                                    opacity: (loading || (!messageInput.trim() && !selectedImage)) ? 0.5 : 1,
                                    cursor: (loading || (!messageInput.trim() && !selectedImage)) ? 'not-allowed' : 'pointer'
                                }}
                            > {loading ? 'Uploading...' : 'Send'}
                            </button>

                            {selectedImage && (
                                <div style={{ display: "flex" }}>
                                    <img
                                        src={selectedImage}
                                        alt="Selected"
                                        style={{ maxWidth: '100px', maxHeight: '3rem', objectFit: 'cover' }}
                                    />
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        style={{
                                            position: 'absolute',
                                            bottom: '4rem',
                                            right: '1rem',
                                            backgroundColor: "red",
                                            color: 'pink',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '1.5rem',
                                            height: '1.5rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default Message;