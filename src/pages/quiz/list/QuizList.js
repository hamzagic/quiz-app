import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayAddPanel } from '../../../store/reducers/quizReducer';
import styles from './QuizList.module.scss';
import ListItem from './listItem/ListItem';
import Button from '../../../components/button/Button';
import { apiConstants } from '../../../constants/constants';
import API from '../../../routes/api';
import bt from '../../../components/buttons/BtnPrimary.module.scss';
import QuizDetails from '../details/QuizDetails';

const QuizList = () => {
  const [quizList, setQuizList] = useState([]);
  //const [showDetails, setShowDetails] = useState(false);
  const [id, setId] = useState('');
  const showPanel = useSelector((state) => state.quiz.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await API.get(apiConstants.quiz_get)
        .then((res) => {
          setQuizList(res.data.data);
        })
        .catch((err) => {
          console.log('ERRO! ', err);
        });
    };
    fetchData();
  }, []);

  const handleSeeQuizDetails = (quiz) => {
    setId(quiz);
    dispatch(displayAddPanel());
  };

  const buttonStyle = {
    border: 'none',
    backgroundColor: '#E34A6F',
    color: '#fff',
    padding: '5px',
    cursor: 'pointer',
    borderRadius: '5px',
    width: '150px',
    marginLeft: '5px',
    marginRight: '5px',
  };

  const btnStyle = {
    background: '#6622CC',
    color: '#fff',
    border: 'none',
    padding: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
  };

  return (
    <div className={styles.container}>
      {!showPanel && (
        <>
          <div className={styles.btnContainers}>
            <Button title='Active quizzes' styles={buttonStyle} />
            <Button title='All quizzes' styles={buttonStyle} />
          </div>
          <table>
            <thead>
              <tr>
                <th>Quiz Name</th>
                <th>Total Questions</th>
                {/* <th>Questions Per Page</th> */}
                <th>Back Button</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
            </thead>
            {quizList.map((quiz, id) => {
              return (
                <tbody key={id}>
                  <tr>
                    <td>{quiz.quiz_name}</td>
                    <td>{quiz.total_questions}</td>
                    {/* <td>{quiz.questions_per_page}</td> */}
                    <td>{quiz.back_button ? 'Yes' : 'No'}</td>
                    <td>{quiz.start_date}</td>
                    <td>{quiz.end_date}</td>
                    <td>{quiz.active ? 'Yes' : 'No'}</td>
                    <td>
                      <button
                        className={bt.btnPrimary}
                        onClick={() => handleSeeQuizDetails(quiz.quiz_id)}
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
      {showPanel && <QuizDetails id={id} />}
    </div>
  );
};

export default QuizList;
