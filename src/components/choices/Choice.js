import React, {useState} from "react";
import styles from "./Choice.module.scss";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const Choice = (props) => {
  return(
    <div className={styles.alternativeContainer}>
      <div className={styles.alternative}>
        <input type="text" value={props.text} onChange={props.change} placeholder="Write the choice text..." />
        <FaRegTrashAlt className={styles.trashIcon} onClick={props.deleteChoice} />
        <FaPlus className={styles.plus} onClick={props.addChoice} />
      </div>
      <div className={styles.correctContainer}>
        <label htmlFor="correct">Correct Answer?</label>
        <input type="checkbox" onChange={props.checked} name="correct" />
      </div>
    </div>
  );
}

export default Choice;