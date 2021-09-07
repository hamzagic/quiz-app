import React from 'react';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';

import styles from './AddSchool.module.scss';

const AddSchool = () => {
  const handleName = () => {

  }

  const btnStyle = {
    border: 'none',
    background: '#6622CC',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer'
  }

  const cancelBtnStyle = {
    border: 'none',
    background: '#ff0000',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '5px'
  }

  const handleSend = () => {
    console.log('send clicked');
  }

  const handleCancel = () => {
    console.log('cancel clicked');
  }

  return(
    <div className={styles.formContainer}>
      <Input placeholder="School Name" className={styles.input} type="text" onChange={handleName} />
      <Input placeholder="Address" type="text" onChange={handleName} />
      <Input placeholder="Email" type="text" onChange={handleName} />
      <Input placeholder="Phone Number" type="text" onChange={handleName} />
      <Input placeholder="Contact Person" type="text" onChange={handleName} />
      <div className={styles.btnContainer}>
        <Button title="Cancel" styles={cancelBtnStyle} click={handleCancel} />
        <Button title="Create" styles={btnStyle} click={handleSend} />
      </div>
    </div>
  );
}

export default AddSchool;
