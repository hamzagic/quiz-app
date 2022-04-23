import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideAddPanel } from '../../../store/reducers/staffReducer';
import Validator from '../../../utils/validator';

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
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const [message, setMessage] = useState('');

  const [firstNameError, setFirstNameError] = useState(' ');
  const [lastNameError, setLastNameError] = useState(' ');
  const [emailError, setEmailError] = useState(' ');
  const [passwordError, setPasswordError] = useState(' ');
  const [schoolError, setSchoolError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [roleError, setRoleError] = useState('');

  const [schoolId, setSchoolId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [roleId, setRoleId] = useState('');
  const [finished, setFinished] = useState(false);
  let school;
  let subject;
  let role;

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
    let id = schoolItems.filter((item) => {
      return item.name === e.target.value;
    });
    setSelectedSchool(e.target.value);
    if(id && id[0]) {
      school = id[0].id;
      setSchoolId(school);
    } 
    if (e.target.value === "School") setSelectedSchool('');
    validateSelected(selectedSchool, "0", setSchoolError);
  }

  const handleSubject = (e) => {
    let id = subjectItems.filter((item) => {
      return item.subject_name === e.target.value;
    });
    setSelectedSubject(e.target.value);
    if(id && id[0]) {
      subject = id[0].subject_id;
      setSubjectId(subject);
    }
    if (e.target.value === "Subject") setSelectedSubject('');
  }

  const handleRole = (e) => {
    let id = roleItems.filter((item) => {
      return item.role_title === e.target.value;
    });
    setSelectedRole(e.target.value);
    if(id && id[0]) {
      role = id[0].role_id;
      setRoleId(role);
    }
    if (e.target.value === "Role") setSelectedRole('');
  }

  const handleCreate = async () => {
    const checkSchool = validateSelected(selectedSchool, "0", setSchoolError);
    const checkRole = validateSelected(selectedRole, "0", setRoleError);
    const checkSubject = validateSelected(selectedSubject, "0", setSubjectError);

    if (checkSchool || checkRole || checkSubject) return;
    setMessage('');
    
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      school_id: schoolId,
      subject_id: subjectId,
      role_id: roleId
    }

    console.log("data", data);

    await API.post(apiConstants.staff_post, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      setMessage('Staff created successfully');
      handleClear();
      setFinished(true);
    })
    .catch(err => console.log(err));
  }

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setSelectedSchool('');
    setSelectedSubject('');
    setSelectedRole('');
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setSchoolError('');
    setSubjectError('');
    setRoleError('');
  }

  const handleClosePanel = () => {
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

  const validateSelected = (value, defaultValue, fn) => {
    fn('');
    const validator = new Validator();
    const schoolVerification = validator.selectRequired(value, defaultValue);
    if (schoolVerification) fn(schoolVerification);
  }

  const errorFields =
    firstNameError ||
    lastNameError ||
    emailError ||
    passwordError ||
    schoolError ||
    roleError ||
    subjectError ||
    finished
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
        onBlur={() => validatePassword(password, 6, setPasswordError)}
      />
      <div className={styles.errorMessage}>{passwordError}</div>
      <Select
        items={schoolItems}
        title="School"
        name="name"
        onChange={handleSchool}
        styles={selectStyle}
        value={selectedSchool}
        onBlur={() => validateSelected(selectedSchool, "0", setSchoolError)}
      />
      <div className={styles.errorMessage}>{schoolError}</div>
      <Select
        items={subjectItems}
        title="Subject"
        name="subject_name"
        onChange={handleSubject}
        styles={selectStyle}
        value={selectedSubject}
        onBlur={() => validateSelected(selectedSubject, "0", setSubjectError)}
      />
      <div className={styles.errorMessage}>{subjectError}</div>
      <Select
        items={roleItems}
        title="Role"
        name="role_title"
        onChange={handleRole}
        styles={selectStyle}
        value={selectedRole}
        onBlur={() => validateSelected(selectedRole, "0", setRoleError)}
      />
      <div className={styles.errorMessage}>{roleError}</div>
      <div className={styles.btnContainer}>
        <Button title="Clear" styles={cancelBtnStyle} click={handleClear} />
        <Button title="Create" styles={hasErrors ? btnDisabled : btnStyle} click={handleCreate} disabled={hasErrors} />
      </div>
    </div>
  );
}

export default AddUser;
