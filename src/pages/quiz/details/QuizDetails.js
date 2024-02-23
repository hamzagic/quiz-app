import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideAddPanel } from '../../../store/reducers/quizReducer';
import { showData } from '../../../store/reducers/quizDetailReducer';
import styles from './QuizDetails.module.scss';
import API from '../../../routes/api';
import { apiConstants } from '../../../constants/constants';
import Button from '../../../components/button/Button';

const QuizDetails = (props) => {
    const showPanel = useSelector((state) => state.quiz.value);
    const details = props.details;
    const dispatch = useDispatch();

    useEffect(() => {
    }, [details]);

    const btnStyle = {
        border: 'none',
        background: '#4281A4',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    }

    const handleGoBack = () => {
        console.log('clicked')
        dispatch(hideAddPanel());
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
                        <div>{details.created}</div>
                    </div>
                    {/* <div>
                        <div className={styles.detailTitle}>Updated</div>
                        <div>{quizData.quiz.updated_at}</div>
                    </div> */}
                    <div className={styles.questionContainer}>
                    <div className={styles.detailTitle}>Questions</div>
                    {details.questions.map(question => 
                        <>
                        <div className={styles.itemContainer}>
                            <div className={styles.detailTitle}>Title:</div> 
                            <div>{question.questionText}</div>
                        </div>
                        <div className={styles.itemContainer}>
                            <div className={styles.detailTitle}>Order:</div>
                            <div>{question.order}</div>
                        </div>
                        <div className={styles.itemContainer}>
                            <div className={styles.detailTitle}>Answers:</div>
                            {question.answers.map((answer) => 
                                <div>
                                    <p>{answer}</p>
                                </div>
                            )}
                        </div>
                        </>
                    )}
                    </div>
                </div>
            </div> 
        }
        </>
    );
}

export default QuizDetails;