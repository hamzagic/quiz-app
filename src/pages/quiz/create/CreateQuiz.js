import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../../../components/sidebar/Sidebar';
import styles from './CreateQuiz.module.scss';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import CalendarComponent from '../../../components/calendar/CalendarComponent';
import Modal from 'react-modal';

const CreateQuiz = () => {
  const [value, onChange] = useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const history = useHistory();
  Modal.setAppElement('#root');

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {

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

  const handleCreateClick = () => {
    console.log('clicked');
  }

  const handleCancelClick = () => {
    history.goBack();
  }
  return (
    <div>
      <div className={styles.container}>
        <h1>Create a New Quiz</h1>
        <div className={styles.card}>
          <div className={[styles.inputContainer, 'mb-20'].join(' ')}>
            <span className={styles.textContainer}>Quiz Name: </span>
            <Input placeholder="Name" styles={inputName} />
          </div>

          <div className={styles.optionsContainer}>
            <div className={styles.textContainer}>Questions per page:</div>
            <Input type="number" min="1" styles={inputStyle} />
          </div>
          <div className={[styles.optionsContainer, 'mb-20'].join(' ')}>
            <span className={styles.textContainer}>Duration: </span>
            <Input type="number" min="1" styles={inputStyle} />
            <span className={[styles.days, 'ml-05'].join(' ')}>day(s).</span>
          </div>
          <div className={styles.checkboxContainer}>
            <span className={styles.textContainer}>Back Button:</span>
            <div className={styles.checkbox}><input type="checkbox" /></div>
          </div>
          <div className={[styles.calendarContainer, 'mt-10', 'mb-10'].join(' ')}>
            <div className={styles.textContainer}>Start date: </div>
            <Button click={openModal} title='Select Date' styles={btnCalendar} />
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal Here">
              <div onClick={closeModal} className={styles.closeBtn}>x</div>
              <CalendarComponent onChange={onChange} value={value} />
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
