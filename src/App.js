import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Quiz from './pages/quiz/Quiz';
import Profile from './pages/profile/Profile';
import NotFound from './pages/404/NotFound';
// import Users from './pages/users/Users';
import CreateQuiz from './pages/quiz/create/CreateQuiz';
import Header from './components/header/Header';

import './App.scss';

function App() {
  const loggedInUser = Cookies.get('token');
  const history = useHistory();

  useEffect(() => {
    if(loggedInUser) {
      history.push("/dashboard");
    } else {
      history.push("/login");
    }
  }, [loggedInUser, history]);

  if (loggedInUser && loggedInUser.length > 0) {
    return(
      <div className="App">
      <Header />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/quiz" component={Quiz} />
      <Route component={NotFound} />
      {/* <Route path="/users" component={Users} /> */}
      <Route path="/quiz/create" component={CreateQuiz} />
    </div>
    );
  } else {
    return(
      <Route to="/login" component={Login} />
    );
  }
}

export default App;
