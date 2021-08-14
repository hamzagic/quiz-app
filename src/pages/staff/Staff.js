import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './Staff.module.scss';

const Staff = () => {
    return(
        <div>
            <div className={styles.container}>
                <h1>Staff</h1>
                <p>Visible when logged user is a staff admin.</p>
                <p>Root admin will see staff of all schools.</p>
            </div>
            <Sidebar />
        </div>
    );
}

export default Staff;