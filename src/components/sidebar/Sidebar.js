import React from 'react';
import {Link} from 'react-router-dom'
import styles from './Sidebar.module.scss';
import { FaHome, FaDiceD6, FaUserGraduate, FaSchool, FaUser } from "react-icons/fa";

const Sidebar = () => {
    return(
        <div className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                  <FaHome />
                    <Link to="/" className={styles.item}>Dashboard</Link>
                </li>
                <li className={styles.listItem}>
                  <FaDiceD6 />
                    <Link to="/quiz" className={styles.item}>Quizzes</Link>
                </li>
                <li className={styles.listItem}>
                  <FaUserGraduate />
                <Link to="/users" className={styles.item}>Students</Link>
                </li>
                <li className={styles.listItem}>
                  <FaSchool />
                <Link to="/school" className={styles.item}>Schools</Link>
                </li>
                <li className={styles.listItem}>
                  <FaUser />
                <Link to="/profile" className={styles.item}>Profile</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
