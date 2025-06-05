import { useEffect, useState } from 'react';
import styles from "./middlepart.module.css";
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import StoryCircle from './StoryCircle';
import PostCard from '../Posts/PostCard';
import SearchUser from '../SearchUser/SearchUser';
import CreatePostModal from '../CreatePost/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../Redux/Post/post.action';

const MiddlePart = () => {

  const [openCreatePostModal, setOpenCreatePostModal] = useState(false)

  const handleCloseCreatePostModal = () => {
    setOpenCreatePostModal(false);
  }

  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
  };


  const dispatch = useDispatch();
  const { post } = useSelector(store => store)
  console.log(post);


  useEffect(() => {
    dispatch(getAllPostAction())
  }, [post.newComment])


  return (
    <div className={styles.middleContainer}>

      <SearchUser />

      {/* Stories starts here */}
      {/* <section className={styles.stories}>
        <article className={styles.story}>
          <Avatar id={styles.avatar}>
            <AddIcon id={styles.add} />
          </Avatar>
          <p>New</p>
        </article>
        {story.map((item, index) => <StoryCircle key={index} />)}
      </section> */}
      {/* Stories end here */}

      {/* Creating Posts start here */}
      <section className={styles.createPostCard}>
        <div className={styles.createPostHeader}>
          <Avatar className={styles.userAvatar} />
          <input
            onClick={handleOpenCreatePostModal}
            readOnly
            type="text"
            placeholder="Start a post..."
            className={styles.postInput}
          />
        </div>
        <div className={styles.postOptions}>
          <div className={styles.option} onClick={handleOpenCreatePostModal}>
            <ImageIcon /> <span>Photo</span>
          </div>
          <div className={styles.option} onClick={handleOpenCreatePostModal}>
            <VideoLibraryIcon /> <span>Video</span>
          </div>
          <div className={styles.option} onClick={handleOpenCreatePostModal}>
            <ArticleIcon /> <span>Write article</span>
          </div>
        </div>
      </section>
      {/* Creating Posts end here */}

      {/* Feeds start here */}
      <section className={styles.postsGrid}>
        {post.posts.map((item, index) => (
          <PostCard item={item} key={index} />
        ))}
      </section>
      {/* Feeds ends here */}


      {/* Creating Post Modal */}
      <div>
        <CreatePostModal
          handleClose={handleCloseCreatePostModal}
          open={openCreatePostModal} />
      </div>

    </div>
  );
};

export default MiddlePart;
