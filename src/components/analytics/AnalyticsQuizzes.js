import { useEffect, useState } from "react";
import API from "../../routes/api";
import { apiConstants } from "../../constants/constants";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

const AnalyticsQuizzes = () => {
  const token = Cookies.get('token');
  const decoded = jwtDecode(token);
  const [quizList, setQuizList] = useState([]);
  const [activeQuizzes, setActiveQuizzes] = useState(0);
  const [sharedQuizzes, setSharedQuizzes] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [attemptsCount, setAttemptsCount] = useState(0);

  const getActiveQuizzes = (data) => {
    const active = data.filter(data => data.isActive === true);
    setActiveQuizzes(active.length);
  }

  const getSharedQuizzes = (data) => {
    const shared = data.filter(data => data.isShared === true);
    setSharedQuizzes(shared.length);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      await API.get(apiConstants.quiz_get + decoded.id)
      .then(res => {
        setQuizList(res.data.data);
        getActiveQuizzes(res.data.data);
        getSharedQuizzes(res.data.data);
      })
      .catch(err => console.log(err));
    }
    fetchData();

    const fetchLatestAttempts = async () => {
      const data = {
        id: decoded.id
      }
      await API.post(apiConstants.quiz_post + '/attempts/list/', data, {
        headers: {
          token
        }
      })
      .then(res => {
        setAttempts(res.data.attempts);
        setAttemptsCount(res.data.totalCount);
      })
      .catch(err => console.log(err));
    }
    fetchLatestAttempts();
  },[decoded.id, activeQuizzes, token]);
  
  return (
    <div>
      <h2>Latest Activities</h2>
      <div>
        <p>Active quizzes: {activeQuizzes}</p>
        <p>Shared quizzes: {sharedQuizzes}</p>
        <p>Latest Activities</p>
        {attempts.map((attempt, index) => 
          <div key={index}>
            <p>Name: {attempt.name}</p>
            <p>Email (optional): {attempt.email}</p>
            <p>Score: {attempt.score}</p>
            <p>Quiz: {attempt.quiz.quizName}</p>
          </div>
        )}
        <p>Most recent created quizzes</p>
        <p>Most recent shares</p>
      </div>
    </div>
  );

}

export default AnalyticsQuizzes;