import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAddPanel, showData } from '../../../store/reducers/schoolReducer';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
// import Select from '../../../components/select/Select';
import Validator from '../../../utils/validator';
import styles from './AddSchool.module.scss';
import API from '../../../routes/api';
import { apiConstants } from '../../../constants/constants';

const AddSchool = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [nameError, setNameError] = useState(' ');
  const [addressError, setAddressError] = useState(' ');
  const [emailError, setEmailError] = useState(' ');
  const [phoneError, setPhoneError] = useState(' ');
  const [finished, setFinished] = useState(false);
  const schoolData = useSelector((state) => state.school.value);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (props.id) {
      const fetchData = async () => {
        await API.get(apiConstants.school_get + '/' + props.id)
          .then((res) => {
            console.log('ok', res.data.data);
            dispatch(showData(res.data.data));
            setIsUpdate(true);
          })
          .catch((err) => {
            console.log('ERROR ', err);
          });
      };
      fetchData();
    }
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
    validateField(name, 6, setNameError);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    validateField(address, 6, setAddressError);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    validateEmail(email);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    validatePhoneNumber(phone, 10);
  };

  const btnStyle = {
    border: 'none',
    background: '#6622CC',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const btnDisabled = {
    border: 'none',
    background: '#ccc',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'no-drop',
  };

  const cancelBtnStyle = {
    border: 'none',
    background: '#ff0000',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '5px',
  };

  // const selectStyle = {
  //   width: '300px',
  //   maxWidth: '100%',
  //   height: '40px'
  // };

  const errorFields =
    nameError || addressError || emailError || phoneError || finished;
  let hasErrors = errorFields ? true : false;
  if (isUpdate) hasErrors = false;
  const handleCreate = async () => {
    setMessage('');
    const formData = new FormData();
    formData.append('school_name', name);
    formData.append('address', address);
    formData.append('phone', parseInt(phone));

    if (!schoolData) {
      await API.post(apiConstants.school_post, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          if(res.data.error.length > 0) {
            setErrorMessage(res.data.error[0]);
          } else {
            setMessage('School created successfully');
            handleClear();
            setFinished(true);
          }
        })
        .catch((err) => {
          setErrorMessage('An error occurred');
          console.log(err.error);
        });
    } else {
      await API.post(`${apiConstants.school_post}/${props.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.error.length > 0)
          {
            setErrorMessage(res.data.error[0]);
          } else {
            setMessage('School updated successfully');
            handleClear();
            setFinished(true);
          }
        })
        .catch((err) => {
          console.log(err)
          setErrorMessage('An error occurred.');
        });
    }
  };

  const handleClear = () => {
    setName('');
    setAddress('');
    setEmail('');
    setPhone('');
    setNameError('');
    setAddressError('');
    setEmailError('');
    setPhoneError('');
    hasErrors = true;
  };

  const validateField = (value, min, fn) => {
    fn('');
    const validator = new Validator();
    const minLength = validator.minLength(value, min);
    if (minLength) fn(minLength);
  };

  const validateEmail = () => {
    setEmailError('');
    const validator = new Validator();
    const emailVerification = validator.email(email);
    if (emailVerification) setEmailError(emailVerification);
  };

  const validatePhoneNumber = (value, size) => {
    setPhoneError('');
    const validator = new Validator();
    const phoneVerification = validator.phoneNumber(value, size);
    if (phoneVerification) setPhoneError(phoneVerification);
  };

  const handleClosePanel = () => {
    dispatch(hideAddPanel());
  };

  // todo: select staff by school id or display staff only after school is created.
  return (
    <div className={styles.formContainer} data-testid='test-school'>
      <div className={styles.closePanelBtn} onClick={handleClosePanel}>
        x
      </div>
      <div className={styles.message}>{message}</div>
      <div className={styles.errorMessage}>{errorMessage}</div>
      <Input
        placeholder={schoolData.name ? schoolData.name : 'School Name'}
        className={styles.input}
        value={name}
        type='text'
        onChange={handleName}
        onBlur={() => validateField(name, 6, setNameError)}
      />
      <div className={styles.errorMessage}>{nameError}</div>
      <Input
        placeholder={schoolData.address ? schoolData.address : 'Address'}
        type='text'
        onChange={handleAddress}
        value={address}
        onBlur={() => validateField(address, 6, setAddressError)}
      />
      <div className={styles.errorMessage}>{addressError}</div>
      <Input
        placeholder='Email'
        type='text'
        onChange={handleEmail}
        value={email}
        onBlur={validateEmail}
      />
      <div className={styles.errorMessage}>{emailError}</div>
      {/* Todo: add a phone mask */}
      <Input
        placeholder={
          schoolData.phone_number ? schoolData.phone_number : 'Phone Number'
        }
        type='text'
        onChange={handlePhone}
        value={phone}
        onBlur={() => validatePhoneNumber(phone, 10)}
      />
      <div className={styles.errorMessage}>{phoneError}</div>
      {/* <Select title="Contact Person" items={staff} onChange={handleName} styles={selectStyle} /> */}
      <div className={styles.btnContainer}>
        <Button title='Clear' styles={cancelBtnStyle} click={handleClear} />
        <Button
          title='Submit'
          styles={hasErrors ? btnDisabled : btnStyle}
          click={handleCreate}
          disabled={hasErrors && !isUpdate}
        />
      </div>
    </div>
  );
};

export default AddSchool;
