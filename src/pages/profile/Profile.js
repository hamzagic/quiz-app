import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './Profile.module.scss';

const Profile = () => {
    return(
        <div>
            <div className={styles.container}>
                <h1>Profile</h1>
                <p>Edit Profile (button)</p>
                <p>Display profile</p>
                <p>Log Out (button)</p>
            </div>
            <Sidebar />
        </div>
    );
}

export default Profile;