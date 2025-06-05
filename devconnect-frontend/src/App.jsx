import React, { useEffect } from 'react'
import Authentication from './pages/authentication/Authentication'
import { Route, Routes } from 'react-router-dom'
import Message from './pages/message/Message'
import HomePage from './pages/home/HomePage'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from './Redux/Auth/auth.action'

const App = () => {
    const { auth } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (jwt) {
            dispatch(getProfileAction(jwt));
        }
    }, [dispatch, jwt]);

    return (
        <div>
            <Routes>
                <Route path='*' element={auth.user ? <HomePage /> : <Authentication />} />
                <Route path='message' element={<Message />} />
                {/* <Route path='*' element={<Authentication />} /> */}
            </Routes>
        </div>
    )
}

export default App
