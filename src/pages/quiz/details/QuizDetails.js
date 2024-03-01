import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayAddPanel } from '../../../store/reducers/quizReducer';
import styles from './QuizDetails.module.scss';
import API from '../../../routes/api';
import { apiConstants } from '../../../constants/constants';
import Button from '../../../components/button/Button';
import DateFormatter from '../../../utils/dateFormatter';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import { 
    addQuizName, 
    addQuestion,
    resetQuiz, 
    currentQuestionNumber, 
} from '../../../store/reducers/createQuizReducer';
import { isEdit } from '../../../store/reducers/quizDetailReducer';

const QuizDetails = (props) => {
    const showPanel = useSelector((state) => state.quiz.value);
    const details = props.details;
    const dispatch = useDispatch();
    const token = Cookies.get('token');
    const decoded = jwtDecode(token);
    const history = useHistory();

    useEffect(() => {
    }, [details, showPanel]);

    const btnStyle = {
        border: 'none',
        background: '#6622CC',
        color: '#fff',
        fontWeight: 'bold',
        padding: '6px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
    }

    const redButton = {
        border: 'none',
        background: '#ff0000',
        color: '#fff',
        fontWeight: 'bold',
        padding: '6px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
    }

    const handleGoBack = () => {
        dispatch(resetQuiz());
        dispatch(displayAddPanel(false));
    }

    const handleDelete = () => {
        const deleteConfirm = window.confirm('Are you sure you want to delete the quiz? This action cannot be undone.');
        if (deleteConfirm) {
            if (details.creator === decoded.id) {
                API.delete(`${apiConstants.quiz_delete}/${details.creator}/${details._id}`)
                .then(res => {
                    console.log(res);
                    dispatch(displayAddPanel(false));
                })
                .catch(err => console.log(err));
            }
        }
    }

    const handleEdit = () => {
        console.log(details);
        dispatch(displayAddPanel(false));
        dispatch(isEdit(true));
        // dispatch actions and redirect to create quiz section
        dispatch(addQuizName(details.quizName));
        dispatch(currentQuestionNumber(1));
        details.questions.forEach(question => {
            dispatch(addQuestion(question));
        });
        
        history.push('quiz/create');
    }

    const buttonStyles = {
        backgroundColor: '#3f51b5',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '6px'
    }

    return (
        <>
        {showPanel && details &&
            <div className={styles.detailsContainer}>
                <Button title="< Back" styles={btnStyle} click={handleGoBack} />
                <div className={styles.detailContainer}>
                    <div className={styles.itemContainer}>
                        <div className={styles.detailTitle}>Quiz Name</div>
                        <div>{details.quizName}</div>
                    </div>
                    <div className={styles.itemContainer}>
                        <div className={styles.detailTitle}>Total Questions</div>
                        <div>{details.numberOfQuestions}</div>
                    </div>
                    <div className={styles.itemContainer}>
                        <div className={styles.detailTitle}>Active</div>
                        <div>{details.isActive ? 'Yes' : 'No'}</div>
                    </div>
                    <div className={styles.itemContainer}>
                        <div className={styles.detailTitle}>Shared</div>
                        <div>{details.isShared ? 'Yes' : 'No'}</div>
                    </div>
                    <div className={styles.itemContainer}>
                        <div className={styles.detailTitle}>Created</div>
                        <div>{DateFormatter(details.created)}</div>
                    </div>
                    {/* <div>
                        <div className={styles.detailTitle}>Updated</div>
                        <div>{quizData.quiz.updated_at}</div>
                    </div> */}
                    <div className={styles.questionContainer}>
                        <div className={styles.detailTitle}>Questions</div>
                            {details.questions.map((question, index) => 
                                <div className={styles.separator} key={index}>
                                <div className={styles.itemContainer}>
                                    <div className={styles.detailTitle}>Title:</div> 
                                    <div>{question.questionText}</div>
                                </div>
                                <div className={styles.itemContainer}>
                                    <div className={styles.detailTitle}>Order:</div>
                                    <div>{question.order}</div>
                                </div>
                                <div className={styles.itemContainer}>
                                    <div className={styles.detailTitle}>Correct Answer Index:</div> 
                                    <div>{question.correctAnswerIndex}</div>
                                </div>
                                <div className={[styles.itemContainer, styles.answerTitle].join(' ')}>
                                    <div className={styles.detailTitle}>Answers:</div>
                                    <div className={styles.answersContainer}>
                                        {question.answers.map((answer, index) => 
                                            <div className={styles.answers} key={index}>
                                                <p>{answer}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                </div>
                            )}
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button title="Share Quiz" styles={buttonStyles} />
                        <Button title="Edit Quiz" styles={buttonStyles} click={handleEdit} />
                        <Button title="Delete Quiz" styles={redButton} click={handleDelete} />
                    </div>
                </div>
            </div> 
        }
        
        </>
    );
}

export default QuizDetails;