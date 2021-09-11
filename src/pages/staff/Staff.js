import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { displayAddPanel } from '../../store/reducers/staffReducer';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './Staff.module.scss';
import Button from '../../components/button/Button';
import AddStaff from './add/AddStaff';

const Staff = () => {
  const showPanel = useSelector((state) => state.staff.value);
  const dispatch = useDispatch();

  const title = "Add Staff";

  const btnStyle = {
    border: 'none',
    background: '#6622CC',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }

  const handleClick = () => {
    console.log('clicked');
    dispatch(displayAddPanel());
  }

  return (
    <div>
      <div className={styles.container}>
        <h1>Staff</h1>
        <div className={styles.btnContainer}>
          <Button title={title} styles={btnStyle} click={handleClick} />
        </div>
        {showPanel && <div>
          <AddStaff />
        </div>}
        <p>Students list (filter by active and inactive). List will be hidden when Add Staff is active.</p>
      </div>
      <Sidebar />
    </div>
  );
}

export default Staff;
