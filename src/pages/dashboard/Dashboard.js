import React, {useEffect} from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import style from './Dashboard.module.scss';
import client from '../../routes/api';
import AnalyticsQuizzes from '../../components/analytics/AnalyticsQuizzes';

const Dashboard = () => {
    useEffect(() => {
        client.get("/").then((res) => {
            // console.log(res);
        })
    }, []);
    return(
        <div>
            <div className={style.container}>
                <h1>Dashboard</h1>
                <p>Todo: add charts and analytics data. Number of created, active and shared quizzes. Emails which answered quizzes.</p>
                <p>Choose a quiz and get its analytics data (highest scores, quizzes sent and not answered, percentage of answered quizzes).</p>
            <AnalyticsQuizzes />
            </div>
            <Sidebar />
        </div>
    );
}

export default Dashboard;