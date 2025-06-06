import React from 'react'
import styles from './sidebar.module.css'
import { navigationMenu } from './SidebarNavigation'
import { Avatar, Button, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const { auth } = useSelector(store => store);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("jwt")
    navigate("/")
    console.log("Logout Successful");
    window.location.reload();
  }

  const handleNavigate = (item) => {
    if (item.title === "Profile") {
      navigate(`/profile/${auth?.user.userId}`)
    } else {
      navigate(item.path)
    }
  }

  return (
    <div className={styles.sidebarContainer}>
      <img
        src="/assets/rectangle-logo-copy.png"
        id={styles.rectangularLogo}
        alt="DevConnect Logo"
      />

      <section className={styles.navMenu}>
        {navigationMenu.map((item, index) => (
          <article onClick={() => handleNavigate(item)} key={index} className={styles.navItem}>
            {item.icon}
            <p className={styles.navText}>{item.title}</p>
          </article>
        ))}
      </section>

      <section className={styles.currentProfile}>
        <article>
          <Avatar src="/assets/avatar.png" />
        </article>
        <article>
          <p>{auth.user?.firstName + " " + auth.user?.lastName}</p>
          <p>@{auth.user?.firstName.toLowerCase() + "_" + auth.user?.lastName.toLowerCase()}</p>
        </article>

        <article>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            size="small"
            variant="text"
            style={{ color: '#ffe2f3', textTransform: 'none' }}
          >
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
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </article>
      </section>
    </div>
  )
}

export default SideBar
