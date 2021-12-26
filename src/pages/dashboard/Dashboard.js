import React, {useEffect} from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import style from './Dashboard.module.scss';
import client from '../../routes/api';

const Dashboard = () => {
    useEffect(() => {
        client.get("/").then((res) => {
            console.log(res);
        })
    }, []);
    return(
        <div>
            <div className={style.container}>
                <h1>Dashboard</h1>
                <div>
                    <p>New users</p>
                    <p>John Doe - student</p>
                    <p>Martin Smith - school staff</p>
                </div>
                <div>
                    <p>Ongoing Quizzes</p>
                    <p>Math Quiz</p>
                    <p>Science Quiz</p>
                </div>
                <div>
                    <p>Analytics</p>
                    <p>Answered Quizzes</p>
                    <p>More participative students</p>
                </div>
            </div>
            <Sidebar />
        </div>
    );
}

export default Dashboard;