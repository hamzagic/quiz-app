import React from 'react';
import {Link} from 'react-router-dom'
import styles from './Sidebar.module.scss';

const Sidebar = () => {
    return(
        <div className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <Link to="/">Dashboard</Link>
                </li>
                <li className={styles.listItem}>
                    <Link to="/quiz">Quizzes</Link>
                </li>
                <li className={styles.listItem}>
                <Link to="/users">Students</Link>
                </li>
                <li className={styles.listItem}>
                <Link to="/school">Schools</Link>
                </li>
                <li className={styles.listItem}>
                <Link to="/profile">Profile</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;