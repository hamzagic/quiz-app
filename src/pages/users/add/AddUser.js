import React from 'react';
import { useDispatch } from 'react-redux';
import { hideAddPanel } from '../../../store/reducers/studentReducer';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';

import styles from './AddUser.module.scss';

const AddUser = () => {
  const dispatch = useDispatch();

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

  const handleCreate = () => {
    console.log('send clicked');
  }

  const handleClear = () => {
    // clear fields
  }

  const handleClosePanel = () => {
    dispatch(hideAddPanel());
  }

  return(
    <div className={styles.formContainer}>
      <div className={styles.closePanelBtn} onClick={handleClosePanel}>x</div>
      <Input placeholder="First Name" className={styles.input} type="text" onChange={handleName} />
      <Input placeholder="Last Name" type="text" onChange={handleName} />
      <Input placeholder="Email" type="text" onChange={handleName} />
      <Input placeholder="Password" type="text" onChange={handleName} />
      <Input placeholder="School" type="text" onChange={handleName} />
      <div className={styles.btnContainer}>
        <Button title="Clear" styles={cancelBtnStyle} click={handleClear} />
        <Button title="Create" styles={btnStyle} click={handleCreate} />
      </div>
    </div>
  );
}

export default AddUser;
