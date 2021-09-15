import React from 'react';
import styles from './Button.module.scss';

const Button = (props) => {
    return(
        <div className={styles.btnContainer}>
            <button style={props.styles} onClick={props.click} disabled={props.disabled}>{props.title}</button>
        </div>
    );
}

export default Button;
