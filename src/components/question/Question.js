import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addQuestion } from '../../store/reducers/createQuizReducer';
import styles from './Question.module.scss';
import Choice from '../choices/Choice';
import Button from '../button/Button';
import Input from '../input/Input';

const Question = () => {
  const [question, setQuestion] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [image, setImage] = useState(null);
  const [choiceText, setChoiceText] = useState('');
  const [choiceQty, setChoiceQty] = useState(0);
  const [choices, setChoices] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const dispatch = useDispatch();
  const [questionObject, setQuestionObject] = useState({});
  const [choicesObject, setChoicesObject] = useState({});

  // const questionObject = {
  //   questionNumber: null,
  //   questionText: '',
  //   numberOfChoices: null,
  //   questionImage: '',
  //   choices: [
  //     // {
  //     //   choiceText: '',
  //     //   isCorrect: false,
  //     // },
  //   ],
  // };

  const handleQuestionText = (e) => {
    setQuestion(e.target.value);
    const updatedQuestionObject = {
      ...questionObject,
      questionText: question,
      questionNumber: 1
    }
    setQuestionObject(updatedQuestionObject);
    // todo: check 'quiz' localStorage to get the question number
  };

  const handleChoiceQty = (e) => {
    setChoiceQty(e.target.value);
    const updatedQuestionObject = {
      ...questionObject,
      numberOfChoices: parseInt(e.target.value)
    }
    setQuestionObject(updatedQuestionObject);
  }

  const handleChoiceText = (e) => {
    setChoiceText(e.target.value);
  };

  const handleCorrectChecked = (e) => {
    setCorrectAnswer(e.target.checked);
  };

  const handleDeleteChoice = () => {

  };

  const handleAddChoice = () => {
    const updatedChoicesObject = {
      ...choicesObject,
      choiceText,
      isCorrect: correctAnswer
    }
    setChoicesObject(updatedChoicesObject);
    const updatedQuestionObject = {
      ...questionObject,
      choices: updatedChoicesObject,
    }
    setQuestionObject(updatedQuestionObject);
    localStorage.setItem('question', JSON.stringify(updatedQuestionObject));
  };

  return (
    <div className={styles.questionsContainer}>
      <div className={styles.questions}>
        <div>Question {questionNumber}:</div>
        <div className={styles.imageContainer}>
          <span>Question image (optional):</span>
          <Input type='file' />
        </div>
        <textarea
          name='question'
          cols='30'
          rows='3'
          placeholder='Type your question...'
          onChange={handleQuestionText}
        ></textarea>
        <div className={styles.choicesContainer}>
          <div className={styles.choices}>
            <span>Number of choices:</span>
            <div className={styles.choiceItem}>
              <label htmlFor='1'>1</label>
              <input type='radio' value='1' name='alternatives' onChange={handleChoiceQty} />
            </div>
            <div className={styles.choiceItem}>
              <label htmlFor='2'>2</label>
              <input type='radio' value='2' name='alternatives' onChange={handleChoiceQty} />
            </div>
            <div className={styles.choiceItem}>
              <label htmlFor='3'>3</label>
              <input type='radio' value='3' name='alternatives' onChange={handleChoiceQty} />
            </div>
            <div className={styles.choiceItem}>
              <label htmlFor='4'>4</label>
              <input type='radio' value='4' name='alternatives'  onChange={handleChoiceQty} />
            </div>
            <div className={styles.choiceItem}>
              <label htmlFor='5'>5</label>
              <input type='radio' value='5' name='alternatives' onChange={handleChoiceQty} />
            </div>
          </div>
        </div>
        <div>Choices:</div>
        <Choice
          text={choiceText}
          change={handleChoiceText}
          checked={handleCorrectChecked}
          deleteChoice={handleDeleteChoice}
          addChoice={handleAddChoice}
        />
      </div>
    </div>
  );
};

export default Question;
