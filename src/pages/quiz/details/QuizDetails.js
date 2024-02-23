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
    const quizData = useSelector((state) => state.quizDetails.value);
    const details = props.details;
    const dispatch = useDispatch();

    useEffect(() => {
        // const fetchData = async () => {
        //   await API.get(apiConstants.quiz_get + '/' + props.id)
        //     .then((res) => {
        //       dispatch(showData(res.data.data))
        //     })
        //     .catch((err) => {
        //       console.log('ERROR ', err);
        //     });
        // };
        // fetchData();
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
            <div>
                <Button title="< Back" styles={btnStyle} click={handleGoBack} />
                <div className={styles.detailContainer}>
                    <div>
                        <div className={styles.detailTitle}>Quiz Name</div>
                        {/* <div>{quizData.quiz.quiz_name}</div> */}
                        <div>{details.quizName}</div>
                    </div>
                    <div>
                        <div className={styles.detailTitle}>Total Questions</div>
                        {/* <div>{quizData.quiz.total_questions}</div> */}
                        <div>{details.numberOfQuestions}</div>
                    </div>
                    {/* <div>
                        <div className={styles.detailTitle}>Question Per Page</div>
                        <div>{quizData.quiz.questions_per_page}</div>
                    </div> */}
                    {/* <div>
                        <div className={styles.detailTitle}>Start Date</div>
                        <div>{quizData.quiz.start_date}</div>
                    </div> */}
                    {/* <div>
                        <div className={styles.detailTitle}>End Date</div>
                        <div>{quizData.quiz.end_date}</div>
                    </div> */}
                    <div>
                        <div className={styles.detailTitle}>Active</div>
                        {/* <div>{quizData.quiz.active ? 'Yes' : 'No'}</div> */}
                        <div>{details.isActive ? 'Yes' : 'No'}</div>
                    </div>
                    <div>
                        <div className={styles.detailTitle}>Created</div>
                        {/* <div>{quizData.quiz.created_at}</div> */}
                        <div>{details.created}</div>
                    </div>
                    {/* <div>
                        <div className={styles.detailTitle}>Updated</div>
                        <div>{quizData.quiz.updated_at}</div>
                    </div> */}
                    <div className={styles.detailTitle}>Questions</div>
                </div>
            </div> 
        }
        </>
    );
}

export default QuizDetails;