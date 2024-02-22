import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addQuestionText, 
  addNumberOfChoices, 
  addChoices, 
  setCorrectChoiceIndex
} from '../../store/reducers/createQuizReducer';
import styles from './Question.module.scss';
import Choice from '../choices/Choice';
import Input from '../input/Input';
import { FaRegTrashAlt } from "react-icons/fa";
import { current } from '@reduxjs/toolkit';

const Question = () => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [choiceQty, setChoiceQty] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const dispatch = useDispatch();
  const [choiceTexts, setChoiceTexts] = useState([]);
  const questionNumber = useSelector(state => state.createQuiz.currentQuestionNumber);
  const numberChoices = useSelector(state => state.createQuiz.numberOfChoices);
  const questionTextStore = useSelector(state => state.createQuiz.currentQuestionText);
  const currentChoices = useSelector(state => state.createQuiz.choices);

  useEffect(() => {
  }, [questionText, questionNumber, numberChoices]);

  // todo: add ability to delete a question previously entered

  const handleChoiceTextChange = (index, e) => {
    if (currentChoices) return;
    setChoiceTexts(prevChoiceTexts => {
      const updatedChoiceTexts = [...prevChoiceTexts];
      updatedChoiceTexts[index] = e.target.value;
      return updatedChoiceTexts;
    });
    dispatch(addChoices(choiceTexts));
  };

  const handleQuestionText = (e) => {
    setQuestionText(e.target.value);
    dispatch(addQuestionText(e.target.value));
  };

  const handleChoiceQty = (e) => {
    const qty = parseInt(e.target.value);
    setChoiceQty(qty);
    dispatch(addNumberOfChoices(qty));
  }

  const handleCorrectChecked = (index) => {
    setCorrectAnswer(index);
    dispatch(setCorrectChoiceIndex(index));
  };

  return (
    <div className={styles.questionsContainer}>
      <div className={styles.questions}>
        <div className={styles.questionHeader}>
          <div>Question {questionNumber}:</div>
          <FaRegTrashAlt className={styles.trashIcon} onClick={() => {}} />
        </div>
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
          value={questionTextStore}
        ></textarea>
        <div className={styles.choicesContainer}>
          <div className={styles.choices}>
            <span>Number of choices:</span>
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
              <input type='radio' value='4' name='alternatives' onChange={handleChoiceQty} />
            </div>
            <div className={styles.choiceItem}>
              <label htmlFor='5'>5</label>
              <input type='radio' value='5' name='alternatives' onChange={handleChoiceQty} />
            </div>
          </div>
        </div>
        {(numberChoices > 0 || (currentChoices && currentChoices.length > 0)) && <div>Choices:</div>}
        {(numberChoices > 0 || (currentChoices && currentChoices.length > 0)) && 
          Array.from({length: choiceQty || currentChoices.length }).map((_, index) => 
          <Choice 
            key={index} 
            change={(e) => handleChoiceTextChange(index, e)} 
            checked={() => handleCorrectChecked(index)} 
            text={currentChoices && currentChoices[index]}
          />)
        }
      </div>
    </div>
  );
};

export default Question;
