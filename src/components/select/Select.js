import React from 'react';
import styles from './Select.module.scss';

const Select = (props) => {
  return(
    <div className={styles.selectContainer}>
      <select name="selectComponent" className={styles.selectStyle} style={props.styles} onChange={props.onChange}>
        <option value="0">{props.title}</option>
        {props.items.map((item) => (
          <option value={item[props.id]} selected={props.selected} key={item[props.id]}>{item[props.name]}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
