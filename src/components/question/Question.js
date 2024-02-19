import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addQuestionText, addNumberOfChoices, addChoices, setCorrectChoiceIndex } from '../../store/reducers/createQuizReducer';
import styles from './Question.module.scss';
import Choice from '../choices/Choice';
import Input from '../input/Input';

const Question = () => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [choiceQty, setChoiceQty] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const dispatch = useDispatch();
  const [choiceTexts, setChoiceTexts] = useState([]);
  const questionNumber = useSelector(state => state.createQuiz.currentQuestionNumber)


  const handleChoiceTextChange = (index, e) => {
    setChoiceTexts(prevChoiceTexts => {
      const updatedChoiceTexts = [...prevChoiceTexts];
      updatedChoiceTexts[index] = e.target.value;
      return updatedChoiceTexts;
    });
    dispatch(addChoices(choiceTexts));
  };

  const handleQuestionText = (e) => {
    setQuestion(e.target.value);
    dispatch(addQuestionText(e.target.value));
  };

  const handleChoiceQty = (e) => {
    setChoiceQty(e.target.value);
    dispatch(addNumberOfChoices(e.target.value));
  }

  const handleCorrectChecked = (index) => {
    setCorrectAnswer(index);
    dispatch(setCorrectChoiceIndex(index));
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
        {choiceQty > 0 && <div>Choices:</div>}
        {choiceQty > 0 && 
          Array.from({length: choiceQty }).map((_, index) => 
          <Choice key={index} change={(e) => handleChoiceTextChange(index, e)} checked={(e) => handleCorrectChecked(index)} />)
        }
      </div>
    </div>
  );
};

export default Question;
