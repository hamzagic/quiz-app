import React, { useEffect, useState } from 'react';
import styles from './QuizDetails.module.scss';
import API from '../../../routes/api';
import { apiConstants } from '../../../constants/constants';

const QuizDetails = (props) => {
    const [quizDetails, setQuizDetails] = useState();

    useEffect(() => {
        const fetchData = async () => {
          await API.get(apiConstants.quiz_get + '/' + props.id)
            .then((res) => {
              console.log(res.data.data);
              setQuizDetails(res.data.data);
            })
            .catch((err) => {
              console.log('ERRO! ', err);
            });
        };
        fetchData();
      }, []);
    console.log('props', props);
    return (
        <div>Details</div>
    );
}

export default QuizDetails;