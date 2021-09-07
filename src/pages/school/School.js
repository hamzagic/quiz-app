import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import AddSchool from './add/AddSchool';
import styles from './School.module.scss';

import Button from '../../components/button/Button';

// school creation and list must be visible to admin only
// staff user must be able to view their school profile
// staff user admin must be able to edit their school
const School = () => {
  const btnStyle = {
    border: 'none',
    background: '#6622CC',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer'
  }

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
      setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <div className={styles.container}>
        <h1>Schools</h1>
        <div className={styles.btnContainer}>
          <Button title="Add School" styles={btnStyle} click={handleOpen} />
        </div>

        <AddSchool />

        <p>Schools list (filter by active and inactive)</p>
      </div>
      <Sidebar />
    </div>
  );
}

export default School;
