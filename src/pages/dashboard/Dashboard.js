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
                <p>Todo: add charts and analytics data</p>
            </div>
            <Sidebar />
        </div>
    );
}

export default Dashboard;