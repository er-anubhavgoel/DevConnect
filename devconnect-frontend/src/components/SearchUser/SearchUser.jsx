import { Avatar, Card, CardHeader } from '@mui/material';
import styles from './searchUser.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/auth.action';
import { createChat } from '../../Redux/Message/message.action';

const SearchUser = () => {

    const [username, setUsername] = useState("");

    const dispatch = useDispatch();

    const { auth } = useSelector(store => store);

    const handleSearchUser = (e) => {
        setUsername(e.target.value);
        dispatch(searchUser(username))
    }

    const handleClick = (id) => {
        dispatch(createChat({ userId: id }))
    }

    return (
        <div className={styles.searchUserContainer}>
            <input
                type="text"
                placeholder="Search users..."
                className={styles.searchInput}
                onChange={handleSearchUser}
            />

            {
                username && (
                    auth.searchUser.map((item) => <Card key={item.id} id={styles.searchCard}>
                        <CardHeader onClick={() => {
                            handleClick(item.userId);
                            setUsername("");
                        }}
                            avatar={<Avatar src='/assets/avatar.png' />}
                            title={item.firstName + " " + item.lastName}
                            subheader={`@${item.firstName.toLowerCase()}_${item.lastName.toLowerCase()}`}
                        />
                    </Card>)
                )
            }

        </div>
    );
};

export default SearchUser;
