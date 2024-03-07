import React from "react";
import styles from "./Choice.module.scss";

const Choice = ({ index, text, change, checked, correct, blur }) => {
  return (
    <div className={styles.alternativeContainer}>
      <div className={styles.alternative}>
        <input type="text" value={text} onChange={change} placeholder="Write the choice text..." onBlur={blur} />
      </div>
      <div className={styles.correctContainer}>
        <label htmlFor={`correct-${index}`}>Correct Answer?</label>
        <input type="radio" onChange={correct} name="choices" checked={checked} />
      </div>
    </div>
  );
};

export default Choice;
