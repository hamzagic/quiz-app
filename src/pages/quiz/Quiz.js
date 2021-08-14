import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Button from '../../components/button/Button';
import styles from './Quiz.module.scss';
import QuizList from './list/QuizList';

const Quiz = () => {
    const title = 'Create a new quiz';
    const btnStyle = {
        border: 'none',
        background: '#6622CC',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer'
    }

    const handleClick = () => {
        console.log('button clicked');
    }

    return(
        <div>
            <div className={styles.container}>
                <h1>Quizzes</h1>
                <div className={styles.btnContainer}>
                    <Button title={title} styles={btnStyle} click={handleClick} />
                </div>
                <QuizList />
            </div>
            <Sidebar />
        </div>
    );
}

export default Quiz;
