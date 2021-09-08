import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { displayAddPanel } from '../../store/reducers/studentReducer';
import Sidebar from '../../components/sidebar/Sidebar';
import Button from '../../components/button/Button';
import AddUser from './add/AddUser';
import styles from './Users.module.scss';

const Users = () => {
  const showPanel = useSelector((state) => state.student.value);
  const dispatch = useDispatch();

  const title = "Add Student";

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
        <h1>Students</h1>
        <div className={styles.btnContainer}>
          <Button title={title} styles={btnStyle} click={handleClick} />
        </div>
        {showPanel && <div>
          <AddUser />
        </div>}
        <p>Students list (filter by active and inactive)</p>
      </div>
      <Sidebar />
    </div>
  );
}

export default Users;
