import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styles from './profile.module.css';
import { Avatar, Box, Button, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import PostCard from '../../components/Posts/PostCard';
import UserReelCard from '../../components/Reels/UserReelCard';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';
import { getAllPostAction, getUsersPostAction } from '../../Redux/Post/post.action';
import { followUserAction, getProfileByIdAction } from '../../Redux/Auth/auth.action';


const tabs = [
    { value: "post", name: "Post" },
    { value: "reels", name: "Reels" },
    { value: "saved", name: "Saved" },
    { value: "repost", name: "Repost" }
]


const Profile = () => {
    const { id } = useParams();

    const { auth } = useSelector(store => store);
    // console.log(auth);

    const isOwnProfile = auth.user?.userId === auth.profileById?.userId;

    const dispatch = useDispatch();

    const { post } = useSelector(store => store)
    const posts = post.userPosts;
    const reels = post.userReels;

    const [value, setValue] = React.useState('post');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(getUsersPostAction(id))
    }, [post.newComment, post.like])

    const [open, setOpen] = React.useState(false);
    const handleOpenProfileModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (id) {
            dispatch(getProfileByIdAction(id));
        }
    }, [id, dispatch]);

    const handleFollowToggle = () => {
        dispatch(followUserAction(id));
    };

    return (
        <div className={styles.profileContainer}>
            <section className={styles.coverPhotoContainer}>
                <img
                    src="/assets/rectangle-logo.png"
                    className={styles.coverImage}
                    alt="Cover Photo"
                />
            </section>

            <section className={styles.profilePhotoContainer}>
                <Avatar
                    src="/assets/square-logo-copy.png"
                    className={styles.profileImage}
                />

                {isOwnProfile ? (
                    <Button className={styles.editButton} onClick={handleOpenProfileModal}>
                        Edit Profile
                    </Button>
                ) : (
                    <Button className={styles.editButton} onClick={handleFollowToggle}>
                        {auth.profileById?.followers?.includes(auth.user?.userId) ? "Unfollow" : "Follow"}
                    </Button>
                )}

            </section>

            <section className={styles.profileDetailsContainer}>
                <article>
                    <h1>{auth.profileById?.firstName + " " + auth.profileById?.lastName}</h1>
                    <p>@{auth.profileById?.firstName.toLowerCase() + "_" + auth.profileById?.lastName.toLowerCase()}</p>
                </article>
                <span>{posts?.length} Posts</span>
                <span>{auth.profileById?.followers?.length} Followers</span>
                <span>{auth.profileById?.followings?.length} Followings</span>
            </section>

            {/* <section className={styles.bioContainer}>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore fugiat praesentium deserunt incidunt facere delectus iusto repudiandae temporibus nam. Unde est pariatur obcaecati voluptate alias ipsum eum neque eos voluptatem possimus amet quasi sequi ipsam, nemo nesciunt deserunt in! Recusandae dolores deleniti odit inventore officia, consectetur, quidem porro non vero tenetur placeat doloribus! Aut voluptatum aspernatur dignissimos ut velit veritatis libero optio, eos quod sapiente placeat animi officia ratione voluptate, quam tenetur ea. Quia, quisquam! Facere ullam voluptas quos corrupti libero ratione suscipit labore ad voluptatum explicabo, totam nesciunt, excepturi nihil? Illo praesentium quisquam cumque voluptatem architecto esse amet nihil.
                </p>
            </section> */}

            {/* Tabs Only */}
            <section className={styles.tabsContainer}>
                <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        className={styles.tabs}
                        TabIndicatorProps={{
                            style: {
                                height: '3px',
                                backgroundColor: 'brown',
                                transition: 'all 0.3s ease-in-out',
                                borderRadius: '3px'
                            }
                        }}
                    >
                        {tabs.map((item) => (
                            <Tab
                                key={item.value}
                                value={item.value}
                                label={item.name}
                                className={styles.tab}
                            />
                        ))}
                    </Tabs>
                </Box>
            </section>

            {/* Post Cards Rendered Below Tabs */}
            <section className={styles.tabsValueContainer}>
                {value === 'post' ? (
                    <div className={styles.profilePostsContainer}>
                        {posts.length != 0
                            ? posts.map((item, index) => (
                                <div key={index} className={styles.postCardWrapper}>
                                    <PostCard item={item} />
                                </div>
                            ))
                            : <div style={{ marginLeft: "3rem", color: "red", fontWeight: "600" }}>No Posts Yet</div>}
                    </div>
                ) : value === "reels" ? (
                    <div className={styles.profileReelsContainer}>
                        {reels.length != 0
                            ? reels.map((item, index) => (
                                <div key={index} className={styles.reelCardWrapper}>
                                    <UserReelCard item={item} />
                                </div>
                            ))
                            : <div style={{ marginLeft: "3rem", color: "red", fontWeight: "600" }}>No Reels Yet</div>}
                    </div>
                ) : value === "saved" ? (
                    // <div className={styles.profilePostsContainer}>
                    //     {savedPost.map((item, index) => (
                    //         <div key={index} className={styles.postCardWrapper}>
                    //             <PostCard item={item} />
                    //         </div>
                    //     ))}
                    // </div>
                    <div style={{ color: "red", fontWeight: "600" }}>No Saved Post Yet</div>
                ) : (
                    <div style={{ color: "red", fontWeight: "600" }}>No Reposts Yet</div>
                )}
            </section>

            <section>
                <ProfileModal open={open} handleClose={handleClose} />
            </section>
        </div>
    );
};

export default Profile;
