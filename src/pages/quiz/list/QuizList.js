import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayAddPanel } from '../../../store/reducers/quizReducer';
import styles from './QuizList.module.scss';
import { apiConstants } from '../../../constants/constants';
import API from '../../../routes/api';
import bt from '../../../components/buttons/BtnPrimary.module.scss';
import QuizDetails from '../details/QuizDetails';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import DateFormatter from '../../../utils/dateFormatter';

const QuizList = () => {
  const [quizList, setQuizList] = useState([]);
  // const [showDetails, setShowDetails] = useState(false);
  const [id, setId] = useState('');
  const [details, setDetails] = useState(null);
  const showPanel = useSelector((state) => state.quiz.value);
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const decoded = jwtDecode(token);

  useEffect(() => {
    const fetchData = async () => {
      await API.get(apiConstants.quiz_get + decoded.id)
        .then((res) => {
          setQuizList(res.data.data);
        })
        .catch((err) => {
          console.log('ERROR! ', err);
        });
    };
    fetchData();
  }, [decoded.id, showPanel]);

  const handleSeeQuizDetails = async (id) => {
    const token = Cookies.get('token'); 
    setId(id);
    await API.get(`${apiConstants.quiz_get}details/${id}`, {
      headers: {
        token 
      },
    })
    .then(res => {
      setDetails(res.data.data);
      dispatch(displayAddPanel(true));
    })
    .catch(error => console.log(error));
  };

  // const buttonStyle = {
  //   border: 'none',
  //   backgroundColor: '#E34A6F',
  //   color: '#fff',
  //   padding: '5px',
  //   cursor: 'pointer',
  //   borderRadius: '5px',
  //   width: '150px',
  //   marginLeft: '5px',
  //   marginRight: '5px',
  // };

  // const btnStyle = {
  //   background: '#6622CC',
  //   color: '#fff',
  //   border: 'none',
  //   padding: '5px',
  //   borderRadius: '5px',
  //   cursor: 'pointer',
  //   marginLeft: '10px',
  // };

  return (
    <div className={styles.container}>
      {!showPanel && quizList.length > 0 && (
        <>
        <h1 className={styles.title}>My Quizzes</h1>
        {/* todo: create a filter  for active and inactive quizzes */}
          {/* <div className={styles.btnContainers}>
            <Button title='Active quizzes' styles={buttonStyle} />
            <Button title='All quizzes' styles={buttonStyle} />
          </div> */}
          <table>
            <thead>
              <tr>
                <th>Quiz Name</th>
                <th>Total Questions</th>
                <th>Active</th>
                <th>Shared</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>
            {quizList.map((quiz, id) => {
              return (
                <tbody key={id}>
                  <tr>
                    <td>{quiz.quizName}</td>
                    <td>{quiz.numberOfQuestions}</td>
                    <td>{quiz.isActive ? 'Yes' : 'No'}</td>
                    <td>{quiz.isShared ? 'Yes' : 'No'}</td>
                    <td>{DateFormatter(quiz.created)}</td>
                    <td>
                      <button
                        className={bt.btnPrimary}
                        onClick={() => handleSeeQuizDetails(quiz._id)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </>
      )}
      {showPanel && 
        <QuizDetails details={details} id={id} /> 
      }
      {quizList.length === 0 && <h2>No Quizzes Created Yet.</h2>}
    </div>
  );
};

export default QuizList;
