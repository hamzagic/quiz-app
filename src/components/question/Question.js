import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addQuestionText, 
  addNumberOfChoices, 
  addChoices, 
  setCorrectChoiceIndex,
  addQuestion 
} from '../../store/reducers/createQuizReducer';
import styles from './Question.module.scss';
import Choice from '../choices/Choice';
import Input from '../input/Input';
import { FaRegTrashAlt } from "react-icons/fa";

const Question = () => {
  const dispatch = useDispatch();
  const currentQNumber = useSelector(state => state.createQuiz.currentQuestionNumber);
  const questions = useSelector(state => state.createQuiz.questions);
  const currentQuestion = questions.find(q => q.payload.questionNumber === currentQNumber) || {};
  const [choiceQty, setChoiceQty] = useState(currentQuestion.numberOfChoices || 0);

  // Initialize component state
  const [questionText, setQuestionText] = useState(currentQuestion.questionText || '');
  const [choices, setChoices] = useState(currentQuestion.choices || []);
  const currentQuestionText = useSelector(state => state.createQuiz.currentQuestionText);

  // Effect to load current question data
  useEffect(() => {
    const question = questions.find(q => q.payload.questionNumber === currentQNumber);
    if (question) {
      console.log('has question', question);
      setQuestionText(question.payload.questionText || '');
      setChoices(question.payload.choices || []);
    } else {
      // Reset for new question
      console.log('reset for new question');
      setQuestionText('');
      setChoices([]);
    }
  }, [currentQNumber, questions]);

  // Update Redux store when component state changes
  useEffect(() => {
    dispatch(addQuestionText(questionText));
    dispatch(addChoices(choices));
  }, [questionText, choices, dispatch]);

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleChoiceTextChange = (index, text) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = text;
    setChoices(updatedChoices);
  };

  const handleCorrectChoice = (index) => {
    dispatch(setCorrectChoiceIndex(index));
    // Update the correct choice in the current question in the Redux store
    const updatedQuestion = { ...currentQuestion, correctChoice: index };
    dispatch(addQuestion(updatedQuestion));
  };

  const handleChoiceQty = (e) => {
    const qty = parseInt(e.target.value);
    setChoiceQty(qty);
    // Reset choices if the number changes
    setChoices(new Array(qty).fill(''));
  };

  return (
    <div className={styles.questionsContainer}>
      <div className={styles.questions}>
        <div className={styles.questionHeader}>
          <div>Question {currentQNumber}:</div>
          <FaRegTrashAlt className={styles.trashIcon} />
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
          onChange={handleQuestionTextChange}
          value={currentQuestionText || questionText}
        ></textarea>
        <div className={styles.choicesContainer}>
          <div className={styles.choices}>
            <span>Number of choices:</span>
            {[2, 3, 4, 5].map(num => (
              <div key={num} className={styles.choiceItem}>
                <label htmlFor={`${num}`}>{num}</label>
                <input type='radio' id={`${num}`} value={num} checked={choiceQty === num} name='alternatives' onChange={handleChoiceQty} />
              </div>
            ))}
          </div>
        </div>
        <div>Choices:</div>
        {choices.map((choice, index) => (
        <Choice
          index={index}
          key={index}
          text={choice}
          change={(e) => handleChoiceTextChange(index, e.target.value)}
          // onCorrectChoice={() => handleCorrectChoice(index)}
        />
      ))}
      </div>
    </div>
  );
};

export default Question;
