import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideAddPanel } from '../../../store/reducers/studentReducer';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import Select from '../../../components/select/Select';
import Validator from '../../../utils/validator';

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
  const [selectedSchool, setSelectedSchool] = useState('');

  const [message, setMessage] = useState('');
  const [firstNameError, setFirstNameError] = useState(' ');
  const [lastNameError, setLastNameError] = useState(' ');
  const [emailError, setEmailError] = useState(' ');
  const [passwordError, setPasswordError] = useState(' ');
  const [schoolError, setSchoolError] = useState('')

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

  const btnDisabled = {
    border: 'none',
    background: '#ccc',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'no-drop'
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
    validateField(firstName, 2, setFirstNameError);
  }

  const handleLastName = (e) => {
    setLastName(e.target.value);
    validateField(lastName, 2, setLastNameError);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    validateEmail(email);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    validatePassword(password, 6);
  }

  const handleSchool = (e) => {
    setSelectedSchool(e.target.value);
    if (e.target.value === title) setSelectedSchool('');
  }

  const handleCreate = async () => {
    const checkSchool = validateSelected(selectedSchool);
    if (checkSchool) return;
    setMessage('');
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
      setMessage('Student created successfully');
      handleClear();

    })
    .catch(err => console.log(err));
  }

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setSelectedSchool('');
    setFirstNameError(' ');
    setLastNameError(' ');
    setEmailError(' ');
    setPasswordError(' ');
    setSchoolError('');
  }

  const handleClosePanel = () => {
    handleClear();
    dispatch(hideAddPanel());
  }

  const validateField = (value, min, fn) => {
    fn('');
    const validator = new Validator();
    const minLength = validator.minLength(value, min);
    if (minLength) fn(minLength);
  }

  const validateEmail = () => {
    setEmailError('');
    const validator = new Validator();
    const emailVerification = validator.email(email);
    if (emailVerification) setEmailError(emailVerification);
  }

  const validatePassword = () => {
    setPasswordError('');
    const validator = new Validator();
    const passwordVerification = validator.passwordLength(password, 6);
    if (passwordVerification) setPasswordError(passwordVerification);
  }

  const validateSelected = (value, defaultValue) => {
    setSchoolError('');
    const validator = new Validator();
    const schoolVerification = validator.selectRequired(value, defaultValue);
    if (schoolVerification) setSchoolError(schoolVerification);
  }

  const errorFields =
    firstNameError ||
    lastNameError ||
    emailError ||
    passwordError ||
    schoolError
  ;
  const hasErrors = errorFields ? true : false;

  return(
    <div className={styles.formContainer}>
      <div className={styles.closePanelBtn} onClick={handleClosePanel}>x</div>
      <div className={styles.message}>{message}</div>
      <Input
        placeholder="First Name"
        className={styles.input}
        type="text"
        onChange={handleFirstName}
        value={firstName}
        onBlur={() => validateField(firstName, 2, setFirstNameError)}
      />
      <div className={styles.errorMessage}>{firstNameError}</div>

      <Input
        placeholder="Last Name"
        type="text"
        onChange={handleLastName}
        value={lastName}
        onBlur={() => validateField(lastName, 2, setLastNameError)}
      />
      <div className={styles.errorMessage}>{lastNameError}</div>
      <Input
        placeholder="Email"
        type="text"
        onChange={handleEmail}
        value={email}
        onBlur={validateEmail}
      />
      <div className={styles.errorMessage}>{emailError}</div>
      <Input
        placeholder="Password"
        type="password"
        onChange={handlePassword}
        value={password}
        onBlur={() => validatePassword(password, 6, setPasswordError)} />
        <div className={styles.errorMessage}>{passwordError}</div>

      <Select
        items={schoolItems}
        title={title}
        name="name"
        onChange={handleSchool}
        styles={selectStyle}
        value={selectedSchool}
        onBlur={() => validateSelected(selectedSchool, "0")}
      />
      <div className={styles.errorMessage}>{schoolError}</div>

      <div className={styles.btnContainer}>
        <Button title="Clear" styles={cancelBtnStyle} click={handleClear} />
        <Button title="Create" styles={hasErrors ? btnDisabled : btnStyle} click={handleCreate} disabled={hasErrors} />
      </div>
    </div>
  );
}

export default AddUser;
