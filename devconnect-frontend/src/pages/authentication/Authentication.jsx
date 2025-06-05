import styles from './authentication.module.css'
import Login from '../login/Login'
import Register from '../register/Register'
import { Route, Routes } from 'react-router-dom'
import Message from '../message/Message'

const Authentication = () => {
    return (
        <div id={styles.authenticationPage}>
            <section className={styles.bgContainer}></section>

            <section className={styles.formContainer}>
                <article>
                    <span id={styles.logoSpan}>
                        <img src="/assets/square-logo-copy.png" alt="DevConnectLogo" />
                        <article id={styles.quote}>Bridging Ideas, Connecting Futures...</article>
                    </span>

                    <span id={styles.renderSpan}>
                        <Routes>
                            <Route path='/*' element={<Login />} />
                            <Route path='register' element={<Register />} />
                        </Routes>
                    </span>
                </article>
            </section>
        </div>
    )
}

export default Authentication
