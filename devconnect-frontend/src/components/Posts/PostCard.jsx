import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { brown, pink, red, yellow } from '@mui/material/colors';
import styles from './postcard.module.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, deletePostAction, getAllPostAction, likePostAction } from '../../Redux/Post/post.action';
import { isLikedByReqUser } from '../../utils/isLikedByReqUser';
import { Navigate, useNavigate } from 'react-router-dom';

const PostCard = ({ item }) => {

    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');

    const { auth } = useSelector(store => store)
    const [ownProfile, setOwnProfile] = useState(false);


    useEffect(() => {
        setOwnProfile(auth.user?.userId === item.user?.userId);
    }, [auth.user?.userId, item.user?.userId]);

    const handleShowComment = () => setShowComments(!showComments);

    const dispatch = useDispatch();

    const reqUser = useSelector(state => state.auth.user);

    const likedByUser = isLikedByReqUser(reqUser?.userId, item);


    const handleCreateComment = (content) => {
        const postId = item.id || item.postId || item._id || item.postid;
        if (!postId) {
            console.error('No post ID found in item:', item);
            alert('Error: Post ID not found. Check console for details.');
            return;
        }
        const reqData = {
            postId: postId,
            data: { content }
        }
        dispatch(createCommentAction(reqData));
        setCommentText('');
    }

    const handleLikePost = () => {
        const postId = item.id || item.postId || item._id || item.postid;
        if (!postId) {
            console.error('No post ID found for like:', item);
            return;
        }
        console.log('Liking post with ID:', postId);
        dispatch(likePostAction(postId));
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handlePostDelete = () => {
        dispatch(deletePostAction(item?.postId))
        handleClose()
    }

    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate(`/profile/${item.user?.userId}`)
    }

    return (
        <div>
            <Card className={styles.postCard}>
                <CardHeader
                    className={styles.postCardHeader}
                    classes={{
                        title: styles.postCardHeaderTitle,
                        subheader: styles.postCardHeaderSubheader,
                    }}
                    avatar={
                        <Avatar sx={{ bgcolor: pink[900] }} aria-label="recipe">
                            {item.user?.firstName.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <>
                            <Button id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                size="small"
                                variant="text"
                                style={{ color: "brown", textTransform: 'none' }}>
                                <MoreVertIcon />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {!ownProfile ?
                                    <MenuItem onClick={handleNavigation}>Visit Profile</MenuItem> :
                                    <MenuItem onClick={handlePostDelete}>Delete Post</MenuItem>}
                            </Menu>
                        </>
                    }
                    title={`${item.user?.firstName} ${item.user?.lastName}`}
                    subheader={`@${item.user?.firstName.toLowerCase()}_${item.user?.lastName.toLowerCase()}`}
                />

                <div className={styles.imageWrapper}>
                    {item.image ? (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <CardMedia
                                component="img"
                                image={item.image}
                                className={styles.imageWrapperImg}
                            />
                            <CardContent className={styles.postCardContent}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {item.caption}
                                </Typography>
                            </CardContent>
                        </div>
                    ) :
                        <>
                            <CardMedia
                                component="img"
                                image={item.image}
                                style={{ display: "none" }} />
                            <CardContent
                                className={styles.postCardContent}>
                                <Typography variant="body2"
                                    sx={{ maxHeight: "200px", color: "brown", fontSize: "1.5rem", overflowY: "auto" }}>
                                    {item.caption}
                                </Typography>
                            </CardContent>
                        </>
                    }
                </div>

                <CardActions disableSpacing className={styles.cardActions}>
                    <footer className={styles.cardFooter}>
                        <IconButton aria-label="like" className={styles.cardFooterIcon} onClick={handleLikePost}>
                            {likedByUser ? (
                                <FavoriteIcon sx={{ color: red[500] }} />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                        </IconButton>

                        <IconButton aria-label="share" className={styles.cardFooterIcon}>
                            <ShareIcon />
                        </IconButton>

                        <IconButton onClick={handleShowComment} aria-label="comment" className={styles.cardFooterIcon}>
                            {showComments === false ? <CommentIcon /> : <CommentIcon sx={{ color: brown[600] }} />}
                        </IconButton>

                        <IconButton aria-label="bookmark" className={styles.cardFooterIcon}>
                            <BookmarkBorderIcon />
                        </IconButton>
                    </footer>
                </CardActions>

                {showComments && <section className={styles.commentSection}>
                    <div className={styles.commentInputWrapper}>
                        <Avatar
                            sx={{ bgcolor: red[900] }}
                            className={styles.commentSectionAvatar}
                        >
                            {reqUser?.firstName[0]}
                        </Avatar>
                        <input
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && commentText.trim()) {
                                    handleCreateComment(commentText.trim());
                                    console.log('Enter pressed...');
                                }
                            }}
                            type="text"
                            placeholder="Write your comment..."
                            className={styles.commentInput}
                        />
                    </div>

                    <Divider />

                    <div className={styles.commentsList}>
                        {item.comments?.map((comment) => (
                            <div key={comment.id} className={styles.comment}>
                                <Avatar
                                    sx={{ bgcolor: brown[500] }}
                                    className={styles.commentSectionAvatar}
                                >
                                    {comment.user.firstName[0]}
                                </Avatar>
                                <p className={styles.commentText}>{comment.content}</p>
                            </div>
                        ))}
                    </div>

                </section>}
            </Card>

        </div>
    );
};

export default PostCard;