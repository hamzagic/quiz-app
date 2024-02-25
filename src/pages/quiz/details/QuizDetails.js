import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayAddPanel } from '../../../store/reducers/quizReducer';
// import { showData } from '../../../store/reducers/quizDetailReducer';
import styles from './QuizDetails.module.scss';
// import API from '../../../routes/api';
// import { apiConstants } from '../../../constants/constants';
import Button from '../../../components/button/Button';
import DateFormatter from '../../../utils/dateFormatter';

const QuizDetails = (props) => {
    const showPanel = useSelector((state) => state.quiz.value);
    const details = props.details;
    const dispatch = useDispatch();

    useEffect(() => {
    }, [details]);

    const btnStyle = {
        border: 'none',
        background: '#6622CC',
        color: '#fff',
        fontWeight: 'bold',
        padding: '6px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
    }

    const handleGoBack = () => {
        dispatch(displayAddPanel(false));
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
                    {/* <div>
                        <div className={styles.detailTitle}>Start Date</div>
                        <div>{quizData.quiz.start_date}</div>
                    </div> */}
                    {/* <div>
                        <div className={styles.detailTitle}>End Date</div>
                        <div>{quizData.quiz.end_date}</div>
                    </div> */}
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
                </div>
            </div> 
        }
        </>
    );
}

export default QuizDetails;