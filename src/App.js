import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Quiz from './pages/quiz/Quiz';
import Profile from './pages/profile/Profile';
import Users from './pages/users/Users';
import School from './pages/school/School';
import Staff from './pages/staff/Staff';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/users" component={Users} />
      <Route path="/school" component={School} />
      <Route path="/staff" component={Staff} />
    </div>
  );
}

export default App;
