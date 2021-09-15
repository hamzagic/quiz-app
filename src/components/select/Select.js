import React from 'react';
import styles from './Select.module.scss';

const Select = (props) => {
  return(
    <div className={styles.selectContainer}>
      <select name="selectComponent" value={props.value} className={styles.selectStyle} style={props.styles} onChange={props.onChange} onBlur={props.onBlur}>
        <option value="0">{props.title}</option>
        {props.items.map((item, index) => (
          <option value={item[props.id]} key={index}>{item[props.name]}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
