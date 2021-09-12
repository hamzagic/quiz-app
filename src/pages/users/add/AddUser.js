import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideAddPanel } from '../../../store/reducers/studentReducer';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import Select from '../../../components/select/Select';

import API from '../../../routes/api';
import { apiConstants } from '../../../constants/constants';

import styles from './AddUser.module.scss';

const AddUser = () => {
  const dispatch = useDispatch();
  const [schoolItems, setSchoolItems] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(null);

  const title = 'School';

  useEffect(() => {
    API.get(apiConstants.school_get)
    .then(res => {
      setSchoolItems(res.data.data);
    })
    .catch(err => console.log(err));
  },[]);

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

  const selectStyle = {
    width: '300px',
    maxWidth: '100%',
    height: '40px'
  }

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastName = (e) => {
    setLastName(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSchool = (e) => {
    setSelectedSchool(e.target.value);
    if (e.target.value === title) setSelectedSchool(null);
    console.log(selectedSchool);
    console.log(e.target.value);
  }

  const handleCreate = async () => {
    const formData = new FormData();

    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('school_id', selectedSchool);

    await API.post('student', formData, {
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
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setSelectedSchool(null);
  }

  const handleClosePanel = () => {
    dispatch(hideAddPanel());
  }

  return(
    <div className={styles.formContainer}>
      <div className={styles.closePanelBtn} onClick={handleClosePanel}>x</div>
      <Input placeholder="First Name" className={styles.input} type="text" onChange={handleFirstName} value={firstName} />
      <Input placeholder="Last Name" type="text" onChange={handleLastName} value={lastName} />
      <Input placeholder="Email" type="text" onChange={handleEmail} value={email} />
      <Input placeholder="Password" type="text" onChange={handlePassword} value={password} />
      <Select items={schoolItems} title={title} id="id" name="name" onChange={handleSchool} styles={selectStyle} value={selectedSchool} />
      <div className={styles.btnContainer}>
        <Button title="Clear" styles={cancelBtnStyle} click={handleClear} />
        <Button title="Create" styles={btnStyle} click={handleCreate} />
      </div>
    </div>
  );
}

export default AddUser;
