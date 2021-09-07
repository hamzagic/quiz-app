import React from 'react';
import styles from './Button.module.scss';

const Button = (props) => {
    return(
        <div className={styles.btnContainer}>
            <button style={props.styles} onClick={props.click}>{props.title}</button>
        </div>
    );
}

export default Button;
