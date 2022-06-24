import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';

function App() {
  return (
    <Switch>
      <Route path='/' exact>
        <HomePage />
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path='/signup'>
        <SignupFormPage />
      </Route>
    </Switch>
  );
}


export default App;
