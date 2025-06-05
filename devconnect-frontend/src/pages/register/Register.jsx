import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import styles from './register.module.css'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { registerUserAction } from '../../Redux/Auth/auth.action'
import { useNavigate } from 'react-router-dom'

const initialValues = { firstName: "", lastName: "", email: "", password: "", gender: "" }
const validationSchema = {
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().min(6, "Password must be atleast 6 characters").required("Password is required")
}

const Register = () => {

    let [formValue, setformValue] = useState(initialValues);

    let dispatch = useDispatch();
    let navigate = useNavigate();

    let handleSubmit = (values) => {
        setformValue(values);
        dispatch(registerUserAction(values));
        navigate("/");
    }

    return (
        <React.Fragment>
            <Formik onSubmit={handleSubmit}
                // validationSchema={validationSchema}
                initialValues={initialValues}  >

                <Form className={styles.registerForm}>
                    <div className={styles.inputGroup}>
                        <Field name="firstName" placeholder="First Name" type="text" className={styles.inputField} required />
                        <ErrorMessage name="firstName" className={styles.errorText} />
                    </div>
                    <div className={styles.inputGroup}>
                        <Field name="lastName" placeholder="Last Name" type="text" className={styles.inputField} />
                        <ErrorMessage name="lastName" className={styles.errorText} />
                    </div>
                    <div className={styles.inputGroup}>
                        <Field name="email" placeholder="Email" type="email" className={styles.inputField} required />
                        <ErrorMessage name="email" className={styles.errorText} />
                    </div>
                    <div className={styles.inputGroup}>
                        <Field name="password" placeholder="Password" type="password" className={styles.inputField} required />
                        <ErrorMessage name="password" className={styles.errorText} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.radioLabel}>Gender:</label>
                        <div className={styles.radioGroup}>
                            <label>
                                <Field type="radio" name="gender" value="male" /> Male
                            </label>
                            <label>
                                <Field type="radio" name="gender" value="female" /> Female
                            </label>
                        </div>
                        <ErrorMessage name="gender" component="div" className={styles.errorText} />
                    </div>

                    <div className={styles.buttons}>
                        <button type="submit" className={styles.submitButton}>Register</button>
                        <button type="submit" className={styles.submitButton} onClick={() => { navigate("/login") }}>Sign In</button>
                    </div>
                </Form>

            </Formik>
        </React.Fragment>
    )
}

export default Register
