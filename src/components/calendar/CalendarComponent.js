import React from 'react';
import Calendar from 'react-calendar';
import styles from './CalendarComponent.module.scss';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = (props) => {
  return (
    <div className={styles.calendarContainer}>
          <Calendar onChange={props.onChange} value={props.value} />
        </div>
  );
}

export default CalendarComponent;
