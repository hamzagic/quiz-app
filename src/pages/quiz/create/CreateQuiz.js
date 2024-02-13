import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../../../components/sidebar/Sidebar';
import styles from './CreateQuiz.module.scss';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import CalendarComponent from '../../../components/calendar/CalendarComponent';
import Modal from 'react-modal';
import API from '../../../routes/api';
import { apiConstants } from '../../../constants/constants';
import Validator from '../../../utils/validator';
import DateFormatter from '../../../utils/dateFormatter';

const CreateQuiz = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [questionNumber, setQuestionNumber] = useState(0);
  // const [questionsPerPage, setQuestionsPerPage] = useState(0);
  const [hasBackButton, setHasBackButton] = useState(true);

  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [startDateError, setStartDateError] = useState('');
  const [nameError, setNameError] = useState('');
  const [questionNumberError, setQuestionNumberError] = useState('');

  const history = useHistory();

  Modal.setAppElement('#root');

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
    const validator = new Validator();
    const isPast = validator.pastDate(startDate);
    isPast ? setStartDateError(isPast) : setStartDateError('');
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const btnCreateStyle = {
    border: 'none',
    background: '#6622CC',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }

  const btnCancelStyle = {
    border: 'none',
    background: '#FF0000',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }

  const btnCalendar = {
    border: 'none',
    background: '#6622CC',
    color: '#fff',
    padding: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    marginLeft: '10px'
  }

  const inputStyle = {
    // width: '60px',
    maxWidth: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px'
  }

  const inputName = {
    border: '1px solid #ccc',
    borderRadius: '5px'
  }

  const btnDisabled = {
    border: 'none',
    background: '#ccc',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'no-drop'
  }

  const handleCreateClick = async () => {
    if (hasErrors) return;
    const formattedStartDate = DateFormatter(startDate);
    const formattedEndDate = DateFormatter(endDate);
    setErrorMsg('');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('start_date', formattedStartDate);
    formData.append('end_date', formattedEndDate);
    formData.append('questions_per_page', 1);
    formData.append('total_questions', questionNumber);
    formData.append('back_button', hasBackButton ? 1 : 0);
    console.log('caraca', hasBackButton)
    await API.post(apiConstants.quiz_post, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      console.log(res);
      setMessage('Quiz created successfully!');
      clearFields();
    })
    .catch(err => {
      console.log(err)
      setErrorMsg('Could Not Create Quiz');
    });
  }

  const handleCancelClick = () => {
    history.goBack();
  }

  const handleDateRange = (e) => {
    let start = e[0].toLocaleString().split(',')[0];
    let end = e[1].toLocaleString().split(',')[0];
    setStartDate(start);
    setEndDate(end);

    const validator = new Validator();
    const isPast = validator.pastDate(startDate);
    isPast ? setStartDateError(isPast) : setStartDateError('');
  }

  const handleName = (e) => {
    setName(e.target.value);
    validateField(name, 6, setNameError)
  }

  // const handleQuestionsPage = (e) => {
  //   setQuestionsPerPage(e.target.value);
  // }

  const handleQuestionNumber = (e) => {
    setQuestionNumber(e.target.value);
    validateNumericFields(e.target.value);
  }

  const handleBackButton = (e) => {
    setHasBackButton(e.target.checked);
  }

  const validateField = (value, min, fn) => {
    fn('');
    const validator = new Validator();
    const minLength = validator.minLength(value, min);
    if (minLength) fn(minLength);
  }

  const validateNumericFields = (value) => {
    const validator = new Validator();
    const notZeroed = validator.zeroCheck(value);
    if (notZeroed) setQuestionNumberError(notZeroed);
  }

  const clearFields = () => {
    setStartDate('');
    setEndDate('');
    setName('');
    setHasBackButton(false);
  }

  const errorFields = startDateError || nameError || questionNumberError;
  
  const hasErrors = errorFields ? true : false;

  return (
    <div>
      <div className={styles.container}>
        <h1>Create a New Quiz</h1>
        <div className={styles.card}>
        <div className={styles.message}>{message}</div>
          <div className={styles.errorMessage}>{errorMsg}</div>
          <div className={[styles.inputContainer, 'mb-20'].join(' ')}>
            <div>Quiz Name: </div>
            <Input 
              placeholder="Name" 
              styles={inputName} 
              value={name} 
              onChange={handleName} 
              onBlur={() => validateField(name, 6, setNameError)} />
            <div className={styles.errorMessage}>{nameError}</div>
          </div>
          <div className={styles.inputContainer}>
            <div>Number of questions:</div>
            <Input 
            type="number" 
            min="1" 
            styles={inputStyle} 
            value={questionNumber} 
            onChange={handleQuestionNumber}
            onBlur={() => validateNumericFields(questionNumber)} />
            <div className={styles.errorMessage}>{questionNumberError}</div>
          </div>
          {/* <div className={styles.inputContainer}>
            <div className={styles.textContainer}>Questions per page:</div>
            <Input type="number" min="1" styles={inputStyle} value={questionsPerPage} onChange={handleQuestionsPage} />
          </div> */}

          {/* <div className={styles.checkboxContainer}>
            <span>Back Button:</span>
            <div className={styles.checkbox}><input type="checkbox" value={hasBackButton} onChange={handleBackButton} /></div>
          </div> */}
          {/* <div className={[styles.calendarContainer, 'mt-10', 'mb-10'].join(' ')}>
            <div>Start/End Dates: </div>
            {startDate && endDate && 
            <div>{startDate} - {endDate}</div>}
            <Button click={openModal} title='Select Dates' styles={btnCalendar} />
            <div className={styles.errorMessage}>{startDateError}</div>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <div onClick={closeModal} className={styles.closeBtn}>x</div>
              <CalendarComponent
                onChange={handleDateRange}
                title="Start/End Dates" />
            </Modal>
          </div> */}
          <div className={styles.btnContainer}>
            <Button title="Cancel" styles={btnCancelStyle} click={handleCancelClick} />
            <Button title="Create" styles={hasErrors? btnDisabled : btnCreateStyle} click={handleCreateClick} disabled={hasErrors} />
          </div>
        </div>
        </div>
      <Sidebar />
    </div>
  );
}

export default CreateQuiz;
