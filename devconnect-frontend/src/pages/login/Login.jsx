import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import styles from './login.module.css'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { loginUserAction } from '../../Redux/Auth/auth.action'
import { useNavigate } from 'react-router-dom'

const initialValues = { email: "", password: "" }
const validationSchema = {
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required()
}

const Login = () => {

    let [formValue, setformValue] = useState();

    let dispatch = useDispatch();
    let navigate = useNavigate();

    let handleSubmit = (values) => {
        console.log("Handle Submit", values);
        dispatch(loginUserAction(values));
    }

    return (
        <React.Fragment>
            <Formik onSubmit={handleSubmit}
                // validationSchema={Yup.object(validationSchema)}
                initialValues={initialValues} id={styles.formik} >

                <Form className={styles.loginForm}>
                    <div className={styles.inputGroup}>
                        <Field name="email" placeholder="Email" type="email" className={styles.inputField} required />
                        <ErrorMessage name="email" component="div" className={styles.errorText} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <Field name="password" placeholder="Password" type="password" className={styles.inputField} />
                        <ErrorMessage name="password" component="div" className={styles.errorText} />
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.submitButton}>Login</button>
                        <button type="button" className={styles.submitButton} onClick={() => { navigate("/register") }}>Sign Up</button>
                    </div>
                </Form>

            </Formik>

        </React.Fragment>
    )
}

export default Login