import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './Login.module.scss';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Validator from '../../utils/validator';
import client from '../../routes/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [submitError, setSubmitError] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = () => {
        console.log('submit clicked');
        const validator = new Validator();
        const isInvalidEmail = validator.email(email);
        if (isInvalidEmail) {
            setEmailError(isInvalidEmail);
        }
        const isInvalidPassword = validator.required(password);
        if (isInvalidPassword) {
            setPasswordError(isInvalidPassword);
        } else {
            setPasswordError('');
        }

        if(isInvalidEmail) {
            setEmailError(isInvalidEmail);
        } else {
            setEmailError('');
        }

        console.log('emailError', emailError.length);
        console.log('pwdError', passwordError.length);

        if(emailError.length === 0 && passwordError.length === 0) {
            console.log('submitting form');
            const data = {
                email: email,
                password: password,
            }

            client.post("/user/login", data).then((res) => {
                console.log(res.data);
                if(res.data.error) {
                    setSubmitError(res.data.error);
                    return;
                }

                Cookies.set('token', res.data.token);
                window.location.href = '/dashboard';
            }).catch((err) => {
                console.log(err);
            });     
        }
    }
    const title = 'Login';

    const submitBtn = {
        backgroundColor: '#6622CC',
        color: '#fff',
        cursor: 'pointer',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        marginTop: '20px',
    }

    return(
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>{title}</h1>
                <Input type="email" placeholder="Email" onChange={handleEmail} />
                {emailError && <p className={styles.error}>{emailError}</p>}
                <Input type="password" placeholder="Password" onChange={handlePassword} />
                {passwordError && <p className={styles.error}>{passwordError}</p>}
                <Button title="Login" styles={submitBtn} click={handleSubmit} />
                {submitError && <p className={styles.submitError}>{submitError}</p>}
            </div>
        </div>
    );
}

export default Login;