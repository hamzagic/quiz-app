import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import styles from "./Profile.module.scss";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import API from "../../routes/api";
import Validator from "../../utils/validator";
import client from '../../routes/api';

const Profile = () => {
  const token = Cookies.get("token");
  const decoded = jwtDecode(token);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await API.get("user/" + decoded.id)
        .then((res) => {
          setEmail(res.data.data.email);
          setUsername(res.data.data.username);
          setPassword(res.data.data.password);
        })
        .catch((err) => {
          console.log("ERROR! ", err);
        });
    };
    fetchData();
  }, [decoded.id]);

  const handleLogout = () => {
    console.log("clicked");
    // Cookies.remove('token');
    // window.location.href = '/login';
  };

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateFields = () => {
    let errors = true;
    const validator = new Validator();
    const isInvalidEmail = validator.email(email);
    const isInvalidPassword = validator.required(password);
    const isInvalidUsername = validator.required(username);

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

    if (isInvalidUsername) {
      setUsernameError(isInvalidUsername);
    } else {
      setUsernameError("");
    }

    if (
      isInvalidEmail === undefined &&
      isInvalidPassword === undefined &&
      isInvalidUsername === undefined
    ) {
      errors = false;
    } else {
      errors = true;
    }

    return errors;
  };

  const submitEditProfile = (e) => {
    console.log("clicked");
    const hasErrors = validateFields();
    console.log(hasErrors);
    if (!hasErrors) {
      const data = {
        id: decoded.id,
        username: username,
        email: email,
        password: password,
      };

      client
        .post("/user/update", data)
        .then((res) => {
          console.log(res.data);
          if (res.data.error) {
            console.log('has errors');
            setSubmitError(res.data.error);
            return;
          }
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const logoutBtn = {
    border: "none",
    backgroundColor: "#6622CC",
    color: "#fff",
    padding: "5px",
    cursor: "pointer",
    borderRadius: "5px",
    width: "150px",
    marginLeft: "5px",
    marginRight: "5px",
    fontSize: "1.2rem",
  };

  const editBtn = {
    border: "none",
    backgroundColor: "#E34A6F",
    color: "#fff",
    padding: "5px",
    cursor: "pointer",
    borderRadius: "5px",
    width: "150px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "16px",
    fontWeight: "bold",
    fontSize: "1.2rem",
  };

  const inputStyles = {
    borderRadius: "5px",
    width: "100%",
    maxWidth: "100%",
    padding: "5px",
    marginBottom: "10px",
  };

  const submitEditBtn = {
    border: "none",
    backgroundColor: "#6622CC",
    color: "#fff",
    padding: "5px",
    cursor: "pointer",
    borderRadius: "5px",
    width: "150px",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "16px",
    fontWeight: "bold",
    fontSize: "1.2rem",
  };

  return (
    <div>
      <div className={styles.container}>
        <h1>Profile</h1>
        {/* <p>Edit Profile (button)</p> */}
        <div className={styles.profileContainer}>
          <div className={styles.profileGrid}>
            <div className={styles.gridTitles}>
              <p>Username:</p>
              <p>Email:</p>
              <p>Password</p>
            </div>
            <div className={styles.gridData}>
              <p>{username}</p>
              <p>{email}</p>
              {/* <p>{password}</p> */}
              <p>*******</p>
            </div>
          </div>
          <div className={styles.editContainer}>
            <Button
              title="Edit Profile"
              styles={editBtn}
              click={handleEditProfile}
            />
          </div>
        </div>
        <div className={styles.logoutContainer}>
          <Button title="Logout" styles={logoutBtn} click={handleLogout} />
        </div>
      </div>
      {/* Edit Profile Modal */}
      {isModalOpen && (
        <>
          <div className={styles.modalBlocker}></div>
          <div className={styles.modalContainer}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h1>Edit Profile</h1>
                <span onClick={closeModal}>X</span>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.inputContainer}>
                  <div className={styles.itemText}>Username:</div>
                  <Input
                    type="text"
                    placeholder={username}
                    onChange={handleUsername}
                    styles={inputStyles}
                  />
                  <div className={styles.errorMessage}>{usernameError}</div>
                </div>
                <div className={styles.inputContainer}>
                  <div className={styles.itemText}>Email:</div>
                  <Input
                    type="text"
                    placeholder={email}
                    onChange={handleEmail}
                    styles={inputStyles}
                  />
                  <div className={styles.errorMessage}>{emailError}</div>
                </div>
                <div className={styles.inputContainer}>
                  <div className={styles.itemText}>Password:</div>
                  <Input
                    type="password"
                    placeholder="******"
                    onChange={handlePassword}
                    styles={inputStyles}
                  />
                  <div className={styles.errorMessage}>{passwordError}</div>
                </div>
                <div>
                  <Button
                    title="Save"
                    styles={submitEditBtn}
                    click={submitEditProfile}
                  />
                </div>
                <div className={styles.errorSubmitMessage}>{submitError}</div>
              </div>
            </div>
          </div>
        </>
      )}

      <Sidebar />
    </div>
  );
};

export default Profile;
