import React, {useRef} from 'react';
import styles from './AppModal.module.scss';

const AppModal = (props) => {
  return (
    <div className={styles.modalContainer}>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}

export default AppModal;
