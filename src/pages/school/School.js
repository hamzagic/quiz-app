import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { displayAddPanel } from '../../store/reducers/schoolReducer';
import Sidebar from '../../components/sidebar/Sidebar';
import Button from '../../components/button/Button';
import AddSchool from './add/AddSchool';
import styles from './School.module.scss';

const School = () => {
  const showPanel = useSelector((state) => state.school.value);
  const dispatch = useDispatch();

  const btnStyle = {
    border: 'none',
    background: '#6622CC',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }

  const handleClick = () => {
    console.log('clicked');
    dispatch(displayAddPanel());
  }

  const title = "Add School";

  return (
    <div>
      <div className={styles.container}>
        <h1>Schools</h1>
        <div className={styles.btnContainer}>
          <Button title={title} styles={btnStyle} click={handleClick} />
        </div>
        { showPanel && <div>
          <AddSchool />
        </div>}
        <p>Schools list (filter by active and inactive)</p>
      </div>
      <Sidebar />
    </div>
  );
}

export default School;
