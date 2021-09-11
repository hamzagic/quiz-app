import React from 'react';
import { useDispatch } from 'react-redux';
import { hideAddPanel } from '../../../store/reducers/schoolReducer';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
// import Select from '../../../components/select/Select';

import styles from './AddSchool.module.scss';

const AddSchool = () => {
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

  // const selectStyle = {
  //   width: '300px',
  //   maxWidth: '100%',
  //   height: '40px'
  // };

  const handleCreate = () => {
    console.log('send clicked');
  }

  const handleClear = () => {
    // clear fields
  }

  const handleClosePanel = () => {
    dispatch(hideAddPanel());
  }
  // todo: select staff by school id or display staff only after school is created.
  return(
    <div className={styles.formContainer}>
      <div className={styles.closePanelBtn} onClick={handleClosePanel}>x</div>
      <Input placeholder="School Name" className={styles.input} type="text" onChange={handleName} />
      <Input placeholder="Address" type="text" onChange={handleName} />
      <Input placeholder="Email" type="text" onChange={handleName} />
      <Input placeholder="Phone Number" type="text" onChange={handleName} />
      {/* <Select title="Contact Person" items={staff} onChange={handleName} styles={selectStyle} /> */}
      <div className={styles.btnContainer}>
        <Button title="Clear" styles={cancelBtnStyle} click={handleClear} />
        <Button title="Create" styles={btnStyle} click={handleCreate} />
      </div>
    </div>
  );
}

export default AddSchool;
