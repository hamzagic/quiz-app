import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {
    return(
        <div className={styles.inputContainer}>
            <div style={props.styles}>{props.label}</div>
            <input
            data-testid="test-input"
            type={props.type}
            placeholder={props.placeholder}
            style={props.styles}
            onChange={props.onChange}
            value={props.value}
            min={props.min} />
        </div>
    );
}

export default Input;
