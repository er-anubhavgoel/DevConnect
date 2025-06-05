import {
    Avatar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Modal
} from '@mui/material';
import { useFormik } from 'formik';
import ImageIcon from '@mui/icons-material/Image';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { useEffect, useState } from 'react';
import styles from './createPostModal.module.css';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import { useDispatch } from 'react-redux';
import { createPostAction } from '../../Redux/Post/post.action';
import { useSelector } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '0.6rem',
    outline: 'none',
    overflowY: 'auto',
};

const CreatePostModal = ({ handleClose, open }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const { posts } = useSelector(store => store);

    useEffect(()=>{},[posts])

    const formik = useFormik({
        initialValues: {
            caption: "",
            image: "",
            video: ""
        },
        onSubmit: async (values) => {
            console.log('Formik Values:', values);
            dispatch(createPostAction(values))
            handleModalClose()
        }
    });

    const handleSelectImage = async (event) => {
        setIsLoading(true);
        const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
        setSelectedImage(imageUrl);
        setIsLoading(false);
        formik.setFieldValue("image", imageUrl);
    };

    const handleSelectVideo = async (event) => {
        setIsLoading(true);
        const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
        setSelectedVideo(videoUrl);
        setIsLoading(false);
        formik.setFieldValue("video", videoUrl);
    };

    const handleModalClose = () => {
        setSelectedImage(null);
        setSelectedVideo(null);
        formik.resetForm();
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="create-post-modal"
            aria-describedby="create-a-new-post"
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit} className={styles.modalContainer}>
                    <div className={styles.userInfo}>
                        <Avatar />
                        <div>
                            <p>{auth.user?.firstName + " " + auth.user?.lastName}</p>
                            <p>@{auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}</p>
                        </div>
                    </div>

                    <textarea
                        name="caption"
                        placeholder="Write the Caption..."
                        rows="4"
                        value={formik.values.caption}
                        onChange={formik.handleChange}
                        className={styles.captionInput}
                    ></textarea>

                    <div className={styles.mediaButtons}>
                        {/* Image Upload */}
                        <label htmlFor="image-input" className={styles.mediaButtonLabel}>
                            <IconButton color="brown" component="span">
                                <ImageIcon />
                            </IconButton>
                            <span>Image</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleSelectImage}
                            style={{ display: 'none' }}
                            id="image-input"
                        />

                        {/* Video Upload */}
                        <label htmlFor="video-input" className={styles.mediaButtonLabel}>
                            <IconButton color="brown" component="span">
                                <VideoCameraBackIcon />
                            </IconButton>
                            <span>Video</span>
                        </label>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleSelectVideo}
                            style={{ display: 'none' }}
                            id="video-input"
                        />
                    </div>

                    {/* Preview */}
                    {selectedImage && (
                        <div className={styles.mediaPreview}>
                            <img src={selectedImage} alt="Selected" />
                        </div>
                    )}

                    {selectedVideo && (
                        <div className={styles.mediaPreview}>
                            <video src={selectedVideo} controls />
                        </div>
                    )}

                    <Button type="submit" className={styles.submitBtn}>
                        Post
                    </Button>
                </form>

                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={isLoading}
                    onClick={handleModalClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </Modal>
    );
};

export default CreatePostModal;
