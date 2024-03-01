import React from 'react';
import styles from './Button.module.scss';

const Button = (props) => {
    console.log('disabled', props.disabled)
    return(
        <div className={styles.btnContainer}>
            <button style={props.styles} onClick={props.click} disabled={props.disabled}>{props.title}</button>
        </div>
    );
}

export default Button;
