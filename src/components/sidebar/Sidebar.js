import React from 'react';
import {Link} from 'react-router-dom'
import styles from './Sidebar.module.scss';
import { FaHome, FaDiceD6, FaUserGraduate, FaSchool, FaUser } from "react-icons/fa";

const Sidebar = () => {
    return(
        <div className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <Link to="/">
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
                <li className={styles.listItem}>
                  <Link to="/users">
                    <FaUserGraduate />
                    <span className={styles.item}>Students</span>
                  </Link>
                </li>
                <li className={styles.listItem}>
                <Link to="/school">
                  <FaSchool />
                  <span className={styles.item}>Schools</span>
                </Link>
                </li>
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
