import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, IconButton, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import styles from './ProfileModal.module.css';
import { updateProfileAction } from '../../Redux/Auth/auth.action';
import { useState } from 'react';

export default function ProfileModal({ open, handleClose }) {
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: auth?.user?.firstName || '',
            lastName: auth?.user?.lastName || '',
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);
                console.log("🔄 Updating profile with:", values);

                // Wait for the update to complete
                await dispatch(updateProfileAction(values));

                console.log("✅ Profile update completed");
                handleClose();
            } catch (error) {
                console.error("❌ Profile update failed:", error);
                // Handle error (show toast, etc.)
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-profile-modal-title"
        >
            <Box className={styles.modalContainer}>
                <form onSubmit={formik.handleSubmit}>
                    <Box className={styles.header}>
                        <Typography className={styles.title} variant="h6">
                            Edit Profile
                        </Typography>
                        <IconButton className={styles.closeButton} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box className={styles.avatarWrapper}>
                        <Avatar
                            sx={{ width: 100, height: 100 }}
                            src="/assets/square-logo-copy.png"
                        />
                    </Box>

                    <Box className={styles.inputFields}>
                        <TextField
                            className={styles.textField}
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            margin="normal"
                            disabled={isSubmitting}
                        />
                        <TextField
                            className={styles.textField}
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            margin="normal"
                            disabled={isSubmitting}
                        />
                    </Box>

                    <Box className={styles.actions}>
                        <Button
                            className={styles.saveButton}
                            style={{ backgroundColor: "brown" }}
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}