import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './Users.module.scss';

const Users = () => {
    return(
        <div>
            <div className={styles.container}>
                <h1>Students</h1>
                <p>Add Student (button)</p>
                <p>Students list (filter by active and inactive)</p>
            </div>
            <Sidebar />
        </div>
    );
}

export default Users;
