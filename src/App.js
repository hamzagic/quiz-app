import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Quiz from './pages/quiz/Quiz';
import Profile from './pages/profile/Profile';
import Users from './pages/users/Users';
import School from './pages/school/School';
import Staff from './pages/staff/Staff';
import CreateQuiz from './pages/quiz/create/CreateQuiz';
import Header from './components/header/Header'

import './App.scss';

function App() {
  // todo: hide header on login/signup pages
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route exact path="/quiz" component={Quiz} />
      <Route path="/users" component={Users} />
      <Route path="/school" component={School} />
      <Route path="/staff" component={Staff} />
      <Route path="/quiz/create" component={CreateQuiz} />
    </div>
  );
}

export default App;
