import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayAddPanel } from '../../store/reducers/staffReducer';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './Staff.module.scss';
import Button from '../../components/button/Button';
import AddStaff from './add/AddStaff';
import { apiConstants } from '../../constants/constants';
import API from '../../routes/api';
import btn from '../../components/buttons/BtnPrimary.module.scss';

const Staff = () => {
  const showPanel = useSelector((state) => state.staff.value);
  const dispatch = useDispatch();
  const [staffList, setStaffList] = useState([]);

  const title = 'Add Staff';

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
      await API.get(apiConstants.staff_get)
        .then((res) => {
          console.log(res.data.data);
          setStaffList(res.data.data);
        })
        .catch((err) => {
          console.log('ERRO! ', err);
        });
    };
    fetchData();
  }, [showPanel]);

  const handleClick = () => {
    dispatch(displayAddPanel());
  };

  const handleEditStaff = () => {};

  return (
    <div>
      <div className={styles.container}>
        <h1>Staff</h1>
        {!showPanel && (
          <div className={styles.btnContainer}>
            <Button title={title} styles={btnStyle} click={handleClick} />
          </div>
        )}
        {showPanel && (
          <div>
            <AddStaff />
          </div>
        )}
        {!showPanel && (
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Is Active</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            {staffList.map((staff, id) => {
              return (
                <tbody key={id}>
                  <tr>
                    <td>{staff.first_name}</td>
                    <td>{staff.last_name}</td>
                    <td>{staff.email}</td>
                    <td>{staff.active ? "Yes" : "No"}</td>
                    <td>{staff.role.role_title}</td>
                    <td>
                      <button
                        className={btn.btnPrimary}
                        onClick={handleEditStaff}
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

export default Staff;
