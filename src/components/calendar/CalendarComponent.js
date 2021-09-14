import React from 'react';
import Calendar from 'react-calendar';
import styles from './CalendarComponent.module.scss';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = (props) => {
  return (
    <div className={styles.calendarContainer}>
          <div className={styles.title}>{props.title}</div>
          <Calendar
            onChange={props.onChange}
            value={props.value}
            returnValue="range"
            selectRange={true}
          />
        </div>
  );
}

export default CalendarComponent;
