import React from 'react';
import {Link} from 'react-router-dom'
import styles from './Sidebar.module.scss';
import { FaHome, FaDiceD6, FaUser } from "react-icons/fa";

const Sidebar = () => {
    return(
        <div className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <Link to="/dashboard">
                    <FaHome />
                    <span className={styles.item}>Dashboard</span>
                    </Link>
                </li>
                <li className={styles.listItem}>
                    <Link to="/quiz">
                      <FaDiceD6 />
                      <span className={styles.item}>Quizzes</span>
                    </Link>
                </li>
                {/* <li className={styles.listItem}>
                  <Link to="/users">
                    <FaUserGraduate />
                    <span className={styles.item}>Users</span>
                  </Link>
                </li> */}
                <li className={styles.listItem}>
                <Link to="/profile">
                  <FaUser />
                  <span className={styles.item}>Profile</span>
                </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
