import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Button from '../../components/button/Button';
import styles from './Profile.module.scss';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import API from '../../routes/api';

const Profile = () => {
    const token = Cookies.get('token');
    const decoded = jwtDecode(token);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await API.get('user/' + decoded.id)
              .then((res) => {
                console.log("result", res);
                setEmail(res.data.data.email);
                setUsername(res.data.data.username);
              })
              .catch((err) => {
                console.log('ERRO! ', err);
              });
          };
          fetchData();
    }, [decoded.id]);

    const logoutBtn = {
        border: 'none',
        backgroundColor: '#E34A6F',
        color: '#fff',
        padding: '5px',
        cursor: 'pointer',
        borderRadius: '5px',
        width: '150px',
        marginLeft: '5px',
        marginRight: '5px',
        fontSize: '1.2rem',
    }

    const editBtn = {
        border: 'none',
        backgroundColor: '#E34A6F',
        color: '#fff',
        padding: '5px',
        cursor: 'pointer',
        borderRadius: '5px',
        width: '150px',
        marginLeft: '5px',
        marginRight: '5px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
    }

    const handleLogout = () => {
        console.log('clicked')
        // Cookies.remove('token');
        // window.location.href = '/login';
    }

    const handleEditProfile = () => {

    }

    return(
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
                            <p>******</p>
                        </div>
                    </div>
                    <div className={styles.editContainer}>
                        <Button title="Edit Profile" styles={editBtn} click={handleEditProfile} />
                    </div>
                </div>
                <div className={styles.logoutContainer}>
                    <Button title="Logout" styles={logoutBtn} click={handleLogout} />
                </div>
            </div>
            <Sidebar />
        </div>
    );
}

export default Profile;