import React, { useState } from "react";
import styles from "./Question.module.scss";

const Question = (props) => {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  return (
    <div className={styles.questionsContainer}>
      <div className={styles.questions}>
        <div>New Question:</div>
        <textarea name="question" cols="30" rows="3"></textarea>
        <div>Number of alternatives:</div>
        <div className={styles.alternativesContainer}>
          <div className={styles.alternatives}>
            <div className={styles.altItem}>
              <label htmlFor="1">1</label>
              <input type="radio" value="1" name="alternatives" />
            </div>
            <div className={styles.altItem}>
              <label htmlFor="2">2</label>
              <input type="radio" value="2" name="alternatives" />
            </div>
            <div className={styles.altItem}>
              <label htmlFor="3">3</label>
              <input type="radio" value="3" name="alternatives" />
            </div>
            <div className={styles.altItem}>
              <label htmlFor="4">4</label>
              <input type="radio" value="4" name="alternatives" />
            </div>
            <div className={styles.altItem}>
              <label htmlFor="5">5</label>
              <input type="radio" value="5" name="alternatives" />
            </div>
          </div>
        </div>
      <div>Alternatives:</div>
      </div>
    </div>
  );
};

export default Question;
