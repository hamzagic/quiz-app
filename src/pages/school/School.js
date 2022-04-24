import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayAddPanel, displayEditPanel } from '../../store/reducers/schoolReducer';
import Sidebar from '../../components/sidebar/Sidebar';
import Button from '../../components/button/Button';
import AddSchool from './add/AddSchool';
import styles from './School.module.scss';
import API from '../../routes/api';
import { apiConstants } from '../../constants/constants';
import btn from '../../components/buttons/BtnPrimary.module.scss';

const School = () => {
  const showPanel = useSelector((state) => state.school.value);
  const dispatch = useDispatch();
  const [schoolList, setSchoolList] = useState([]);
  const [id, setId] = useState('');

  const btnStyle = {
    border: 'none',
    background: '#6622CC',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };
  // todo: add pagination
  useEffect(() => {
    const fetchData = async () => {
      await API.get(apiConstants.school_get)
        .then((res) => {
          console.log(res.data.data);
          setSchoolList(res.data.data);
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

  const handleEditSchool = (id) => {
    console.log('edit school', id);
    setId(id);
    dispatch(displayEditPanel(id));
    // dispatch(displayAddPanel());
  };

  const title = 'Add School';

  return (
    <div>
      <div className={styles.container}>
        <h1>Schools</h1>
        {!showPanel && (
          <div className={styles.btnContainer}>
            <Button title={title} styles={btnStyle} click={handleClick} />
          </div>
        )}
        {showPanel && (
          <div>
            <AddSchool id={id ? id : ''} />
          </div>
        )}
        {!showPanel && (
          <table>
            <thead>
              <tr>
                <th>School Name</th>
                <th>School Address</th>
                <th>Phone Number</th>
                <th>Is Active</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            {schoolList.map((school, id) => {
              return (
                <tbody key={id}>
                  <tr>
                    <td>{school.name}</td>
                    <td>{school.address}</td>
                    <td>{school.phone_number}</td>
                    <td>{school.active ? "Yes" : "No"}</td>
                    <td>{school.created_at}</td>
                    <td>
                      <button
                        className={btn.btnPrimary}
                        onClick={() => handleEditSchool(school.id)}
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
        <div className={styles.table}></div>
      </div>
      <Sidebar />
    </div>
  );
};

export default School;
