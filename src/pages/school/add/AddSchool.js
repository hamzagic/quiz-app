import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideAddPanel } from '../../../store/reducers/schoolReducer';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
// import Select from '../../../components/select/Select';

import styles from './AddSchool.module.scss';
import API from '../../../routes/api';
import { apiConstants } from '../../../constants/constants';

const AddSchool = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleAddress = (e) => {
    setAddress(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePhone = (e) => {
    setPhone(e.target.value);
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

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('school_name', name);
    formData.append('address', address);
    formData.append('phone', phone);

    await API.post(apiConstants.school_post, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));

  }

  const handleClear = () => {
    setName('');
    setAddress('');
    setEmail('');
    setPhone('');
  }

  const handleClosePanel = () => {
    dispatch(hideAddPanel());
  }
  // todo: select staff by school id or display staff only after school is created.
  return(
    <div className={styles.formContainer} data-testid="test-school">
      <div className={styles.closePanelBtn} onClick={handleClosePanel}>x</div>
      <Input placeholder="School Name" className={styles.input} value={name} type="text" onChange={handleName} />
      <Input placeholder="Address" type="text" onChange={handleAddress} value={address} />
      <Input placeholder="Email" type="text" onChange={handleEmail} value={email} />
      <Input placeholder="Phone Number" type="text" onChange={handlePhone} value={phone} />
      {/* <Select title="Contact Person" items={staff} onChange={handleName} styles={selectStyle} /> */}
      <div className={styles.btnContainer}>
        <Button title="Clear" styles={cancelBtnStyle} click={handleClear} />
        <Button title="Create" styles={btnStyle} click={handleCreate} />
      </div>
    </div>
  );
}

export default AddSchool;
