import React from 'react';
import styles from './QuizList.module.scss';
import ListItem from './listItem/ListItem';
import Button from '../../../components/button/Button';

const QuizList = () => {
    const quizzesList = [
        {
            id: 1,
            title: 'Biology Test',
            created_at: '08/10/2021',
            ends: '08/17/2021',
            active: true
        },
        {
            id: 2,
            title: 'Chemistry Test',
            created_at: '08/11/2021',
            ends: '08/18/2021',
            active: true
        },
        {
            id: 3,
            title: 'Math Test',
            created_at: '08/14/2021',
            ends: '08/23/2021',
            active: true
        },
        {
            id: 4,
            title: 'History Test',
            created_at: '08/12/2021',
            ends: '08/19/2021',
            active: false
        }
    ];

    const buttonStyle = {
        border: 'none',
        backgroundColor: '#E34A6F',
        color: '#fff',
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '5px'
    }

    const btnStyle = {
      background: '#6622CC',
      color: '#fff',
      border: 'none',
      padding: '5px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginLeft: '10px'
  }

  const handleDetails = (item) => {
    console.log(item);
  }

    return(
        <div className={styles.container}>
            <div className={styles.btnContainers}>
                <Button title="Active quizzes" styles={buttonStyle} />
                <Button title="All quizzes" styles={buttonStyle} />
            </div>
           {quizzesList.map((item) => (
               <div key={item.id}>
                   <ListItem>
                       <p>Quiz Name: {item.title}</p>
                       <p>Created: {item.created_at}</p>
                       <p>Active: {item.active ? 'Yes' : 'No'}</p>
                       <div className={styles.detailsContainer}>
                        <Button title="Details" styles={btnStyle} click={() => handleDetails(item.id)} />
                       </div>
                    </ListItem>
               </div>
           ))}
        </div>
    );
}

export default QuizList;
