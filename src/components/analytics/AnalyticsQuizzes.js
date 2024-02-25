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
  },[decoded.id, activeQuizzes]);
  
  return (
    <div>
      <h2>Latest Activities</h2>
      <div>
        <p>Total quizzes: {quizList.length}</p>
        <p>Active quizzes: {activeQuizzes}</p>
        <p>Shared quizzes: {sharedQuizzes}</p>
      </div>
    </div>
  );

}

export default AnalyticsQuizzes;