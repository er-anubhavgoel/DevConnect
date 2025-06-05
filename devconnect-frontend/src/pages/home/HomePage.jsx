import styles from './homepage.module.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import MiddlePart from '../../components/MiddlePart/MiddlePart';
import Reels from '../../components/Reels/Reels';
import CreateReelsForm from '../../components/Reels/CreateReelsForm';
import Profile from '../profile/Profile';
import Suggestions from '../../components/Suggestions/Suggestions';
import SideBar from '../../components/SideBar/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfileAction } from '../../Redux/Auth/auth.action';

const HomePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);


    return (
        <div className={styles.homeContainer}>
            <aside className={styles.sidebar}>{<SideBar />}</aside>

            <main className={styles.feeds}>
                <Routes>
                    <Route path="/" element={<MiddlePart />} />
                    <Route path="/reels" element={<Reels />} />
                    <Route path="/" element={<CreateReelsForm />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Routes>
            </main>

            {/* <aside className={styles.suggestions}>
                <Suggestions />
            </aside> */}
        </div>
    )
}

export default HomePage
