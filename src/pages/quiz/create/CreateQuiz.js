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

const CreateQuiz = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionsPerPage, setQuestionsPerPage] = useState(0);
  const [hasBackButton, setHasBackButton] = useState(true);

  const history = useHistory();

  Modal.setAppElement('#root');

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
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
    fontWeight: 'bold'
  }

  const inputStyle = {
    width: '60px',
    maxWidth: '100%'
  }

  const inputName = {
    width: '15vw'
  }

  const handleCreateClick = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('questions_per_page', questionsPerPage);
    formData.append('total_questions', questionNumber);
    formData.append('back_button', hasBackButton);

    await API.post(apiConstants.quiz_post, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
  }

  const handleCancelClick = () => {
    history.goBack();
  }

  const handleDateRange = (e) => {
    let start = e[0].toLocaleString().split(',')[0];
    let end = e[1].toLocaleString().split(',')[0];
    setStartDate(start);
    setEndDate(end);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleQuestionsPage = (e) => {
    setQuestionsPerPage(e.target.value);
  }

  const handleQuestionNumber = (e) => {
    setQuestionNumber(e.target.value);
  }

  const handleBackButton = (e) => {
    setHasBackButton(e.target.checked);
  }

  return (
    <div>
      <div className={styles.container}>
        <h1>Create a New Quiz</h1>
        <div className={styles.card}>
          <div className={[styles.inputContainer, 'mb-20'].join(' ')}>
            <span className={styles.textContainer}>Quiz Name: </span>
            <Input placeholder="Name" styles={inputName} value={name} onChange={handleName} />
          </div>

          <div className={styles.optionsContainer}>
            <div className={styles.textContainer}>Questions per page:</div>
            <Input type="number" min="1" styles={inputStyle} value={questionsPerPage} onChange={handleQuestionsPage} />
          </div>

          <div className={styles.optionsContainer}>
            <div className={styles.textContainer}>Number of questions:</div>
            <Input type="number" min="1" styles={inputStyle} value={questionNumber} onChange={handleQuestionNumber} />
          </div>

          <div className={styles.checkboxContainer}>
            <span className={styles.textContainer}>Back Button:</span>
            <div className={styles.checkbox}><input type="checkbox" value={hasBackButton} onChange={handleBackButton} /></div>
          </div>
          <div className={[styles.calendarContainer, 'mt-10', 'mb-10'].join(' ')}>
            <div className={styles.textContainer}>Start/End date: </div>
            <Button click={openModal} title='Select Dates' styles={btnCalendar} />
            <Modal
              isOpen={modalIsOpen}
              // onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <div onClick={closeModal} className={styles.closeBtn}>x</div>
              <CalendarComponent
                onChange={handleDateRange}
                title="Start/End Dates" />
            </Modal>
          </div>

          <div className={styles.btnContainer}>
            <Button title="Create" styles={btnCreateStyle} click={handleCreateClick} />
            <Button title="Cancel" styles={btnCancelStyle} click={handleCancelClick} />
          </div>
        </div>
        </div>
      <Sidebar />
    </div>
  );
}

export default CreateQuiz;
