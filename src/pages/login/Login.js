import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./Login.module.scss";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Validator from "../../utils/validator";
import client from "../../routes/api";
import Header from "../../components/header/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
  }, [email, password]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateFields = () => {
    const validator = new Validator();
    const isInvalidEmail = validator.email(email);
    const isInvalidPassword = validator.required(password);
    // setPasswordError('');
    // setEmailError('');
    // setSubmitError('');
    if (isInvalidPassword) {
      setPasswordError(isInvalidPassword);
    } else {
      setPasswordError("");
    }
    if (isInvalidEmail) {
      setEmailError(isInvalidEmail);
    } else {
      setEmailError("");
    }

    let errors = true;

    if (isInvalidEmail === undefined && isInvalidPassword === undefined) {
      errors = false;
    } else {
      errors = true;
    }

    return errors;
  };
  const handleSubmit = () => {
    const hasErrors = validateFields();

    if (hasErrors) return;

    const data = {
      email: email,
      password: password,
    };

    client
      .post("/user/login", data)
      .then((res) => {
        if (res.data.error) {
          setSubmitError(res.data.error);
          return;
        }

        Cookies.set("token", res.data.token);
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const title = "Login";

  const submitBtn = {
    backgroundColor: "#6622CC",
    color: "#fff",
    cursor: "pointer",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    marginTop: "20px",
  };

  const inputStyles = {
    padding: "8px",
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>{title}</h1>
          <Input
            type="email"
            placeholder="Email"
            onChange={handleEmail}
            styles={inputStyles}
          />
          {emailError && <p className={styles.error}>{emailError}</p>}
          <Input
            type="password"
            placeholder="Password"
            onChange={handlePassword}
            styles={inputStyles}
          />
          {passwordError && <p className={styles.error}>{passwordError}</p>}
          <Button title="Login" styles={submitBtn} click={handleSubmit} />
          {submitError && <p className={styles.submitError}>{submitError}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
