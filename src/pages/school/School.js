import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './School.module.scss';

const School = () => {
    return(
        <div>
            <div className={styles.container}>
                <h1>Schools</h1>
                <p>Add a school (button)</p>
                <p>Schools list (filter by active and inactive)</p>
            </div>
            <Sidebar />
        </div>
    );
}

export default School;