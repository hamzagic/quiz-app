import React, { useState } from "react";
import styles from "./Question.module.scss";
import Choice from "../choices/Choice";
import Button from "../button/Button";
import Input from "../input/Input";

const Question = () => {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [choiceText, setChoiceText] = useState('');
  const [choices, setChoices] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleChoiceTextChange = (e) => {
    setChoiceText(e.target.value);
  }

  const handleChecked = (e) => {
    console.log(e.target.checked);
  }

  const handleDeleteChoice = () => {
    
  }

  const handleAddChoice = () => {
    
  }

  return (
    <div className={styles.questionsContainer}>
      <div className={styles.questions}>
        <div>Question 1:</div>
        <div className={styles.imageContainer}>
          <span>Question image (optional):</span>
          <Input type="file" />
        </div>
        <textarea name="question" cols="30" rows="3" placeholder="Type your question..."></textarea>
        <div className={styles.choicesContainer}>
          <div className={styles.choices}>
            <span>Number of choices:</span>
            <div className={styles.choiceItem}>
              <label htmlFor="1">1</label>
              <input type="radio" value="1" name="alternatives" />
            </div>
            <div className={styles.choiceItem}>
              <label htmlFor="2">2</label>
              <input type="radio" value="2" name="alternatives" />
            </div>
            <div className={styles.choiceItem}>
              <label htmlFor="3">3</label>
              <input type="radio" value="3" name="alternatives" />
            </div>
            <div className={styles.choiceItem}>
              <label htmlFor="4">4</label>
              <input type="radio" value="4" name="alternatives" checked />
            </div>
            <div className={styles.choiceItem}>
              <label htmlFor="5">5</label>
              <input type="radio" value="5" name="alternatives" />
            </div>
          </div>
        </div>
      <div>Choices:</div>
      <Choice 
        text={choiceText} 
        change={handleChoiceTextChange} 
        checked={handleChecked} 
        deleteChoice={handleDeleteChoice}
        addChoice={handleAddChoice}
      />
      </div>
    </div>
  );
};

export default Question;
