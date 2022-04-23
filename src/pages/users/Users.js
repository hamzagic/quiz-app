import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayAddPanel } from '../../store/reducers/studentReducer';
import Sidebar from '../../components/sidebar/Sidebar';
import Button from '../../components/button/Button';
import AddUser from './add/AddUser';
import styles from './Users.module.scss';
import { apiConstants } from '../../constants/constants';
import API from '../../routes/api';
import btn from '../../components/buttons/BtnPrimary.module.scss';

const Users = () => {
  const showPanel = useSelector((state) => state.student.value);
  const dispatch = useDispatch();
  const [studentList, setStudentList] = useState([]);

  const title = 'Add Student';

  const btnStyle = {
    border: 'none',
    background: '#6622CC',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  useEffect(() => {
    const fetchData = async () => {
      await API.get(apiConstants.student_get)
        .then((res) => {
          console.log(res.data.data);
          setStudentList(res.data.data);
        })
        .catch((err) => {
          console.log('ERRO! ', err);
        });
    };
    fetchData();
  }, []);

  const handleClick = () => {
    console.log('clicked');
    dispatch(displayAddPanel());
  };

  const handleEditStudent = () => {
    console.log('edit clicked');
  };

  return (
    <div>
      <div className={styles.container}>
        <h1>Students</h1>
        {!showPanel && (
          <div className={styles.btnContainer}>
            <Button title={title} styles={btnStyle} click={handleClick} />
          </div>
        )}
        {showPanel && (
          <div>
            <AddUser />
          </div>
        )}
        {!showPanel && (
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>School Name</th>
                <th>School Address</th>
                <th>Is Active</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            {studentList.map((student, id) => {
              return (
                <tbody key={id}>
                  <tr>
                    <td>{student.first_name}</td>
                    <td>{student.last_name}</td>
                    <td>{student.email}</td>
                    <td>{student.school.school_name}</td>
                    <td>{student.school.school_address}</td>
                    <td>{student.student_active ? 'Yes' : 'No'}</td>
                    <td>{student.created_at}</td>
                    <td>
                      <button
                        className={btn.btnPrimary}
                        onClick={handleEditStudent}
                      >
                        Edit School
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
      <Sidebar />
    </div>
  );
};

export default Users;
