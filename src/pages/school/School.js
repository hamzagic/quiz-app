import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Button from '../../components/button/Button';
import AddSchool from './add/AddSchool';
import styles from './School.module.scss';

const School = () => {
  const btnStyle = {
    border: 'none',
    background: '#6622CC',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }

  const [viewPanel, setViewPanel] = useState(false);

  const handleClick = () => {
    console.log('clicked');
    setViewPanel(true);
  }

  const title = "Add School";

  return (
    <div>
      <div className={styles.container}>
        <h1>Schools</h1>
        <div className={styles.btnContainer}>
          <Button title={title} styles={btnStyle} click={handleClick} />
        </div>
        { viewPanel && <div>
          <AddSchool />
        </div>}

        <p>Schools list (filter by active and inactive)</p>
      </div>
      <Sidebar />
    </div>
  );
}

export default School;
