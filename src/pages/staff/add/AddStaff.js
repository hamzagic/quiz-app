import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideAddPanel } from '../../../store/reducers/staffReducer';

import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import Select from '../../../components/select/Select';

import { apiConstants } from '../../../constants/constants';

import API from '../../../routes/api';

import styles from './AddStaff.module.scss';

const AddUser = () => {
  const dispatch = useDispatch();
  const [roleItems, setRoleItems] = useState([]);
  const [subjectItems, setSubjectItems] = useState([]);
  const [schoolItems, setSchoolItems] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect (() => {
    API.get(apiConstants.role_get)
    .then(res => {
      setRoleItems(res.data.data);
    })
    .catch(err => console.log(err));
  },[]);

  useEffect(() => {
    API.get(apiConstants.subject_get)
    .then(res => {
      setSubjectItems(res.data.data);
    })
    .catch(err => console.log(err));
  },[]);

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
  }

  const handleSubject = (e) => {
    setSelectedSubject(e.target.value);
  }

  const handleRole = (e) => {
    setSelectedRole(e.target.value);
  }

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('school_id', selectedSchool);
    formData.append('subject_id', selectedSubject);
    formData.append('role_id', selectedRole);

    await API.post(apiConstants.staff_post, formData, {
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
    // clear fields
  }

  const handleClosePanel = () => {
    dispatch(hideAddPanel());
  }

  return(
    <div className={styles.formContainer}>
      <div className={styles.closePanelBtn} onClick={handleClosePanel}>x</div>
      <Input placeholder="First Name" className={styles.input} type="text" onChange={handleFirstName} value={firstName}  />
      <Input placeholder="Last Name" type="text" onChange={handleLastName} value={lastName} />
      <Input placeholder="Email" type="text" onChange={handleEmail} value={email} />
      <Input placeholder="Password" type="text" onChange={handlePassword} value={password} />
      <Select items={schoolItems} title="School" id="id" name="name" onChange={handleSchool} styles={selectStyle} value={selectedSchool} />
      <Select items={subjectItems} title="Subject" id="subject_id" name="subject_name" onChange={handleSubject} styles={selectStyle} value={selectedSubject} />
      <Select items={roleItems} title="Role" id="role_id" name="role_title" onChange={handleRole} styles={selectStyle} value={selectedRole} />
      <div className={styles.btnContainer}>
        <Button title="Clear" styles={cancelBtnStyle} click={handleClear} />
        <Button title="Create" styles={btnStyle} click={handleCreate} />
      </div>
    </div>
  );
}

export default AddUser;
