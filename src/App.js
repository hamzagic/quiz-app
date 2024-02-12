import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Quiz from './pages/quiz/Quiz';
import Profile from './pages/profile/Profile';
import Users from './pages/users/Users';
import CreateQuiz from './pages/quiz/create/CreateQuiz';
import Header from './components/header/Header';

import './App.scss';

function App() {
  const loggedInUser = Cookies.get('token');
  if (loggedInUser && loggedInUser.length > 0) {
    return(
      <div className="App">
      <Header />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route exact path="/quiz" component={Quiz} />
      <Route path="/users" component={Users} />
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
