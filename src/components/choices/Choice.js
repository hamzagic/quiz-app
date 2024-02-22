import React from "react";
import styles from "./Choice.module.scss";

const Choice = ({ index, text, change, checked }) => {
  return (
    <div className={styles.alternativeContainer}>
      <div className={styles.alternative}>
        <input type="text" value={text} onChange={change} placeholder="Write the choice text..." />
      </div>
      <div className={styles.correctContainer}>
        <label htmlFor={`correct-${index}`}>Correct Answer?</label>
        <input type="radio" id={`correct-${index}`} onChange={checked} name="choices" />
      </div>
    </div>
  );
};

export default Choice;
