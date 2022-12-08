import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './LoginForm.css';
// import { Redirect } from 'react-router-dom';


function LoginForm(){
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // if (sessionUser) return (
    //     <Redirect to={`/logged-in/${sessionUser.id}`} />
    // );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
          async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          }
        );
      };

      return (
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div id="credentials">
            <label className="credential-input">
              Username or Email
              <input
                className="credential-field"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
          </div>
          <div id="password">
            <label className="password-input">
              Password
              <input
                className="password-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <span>
            <div className='login-button'>
              <button className="login-btn" type="submit">Log In</button>
            </div>
            <div className="demo-button">
              <button className='demo-user-btn' onClick={() =>{
                  setCredential('Demo-lition')
                  setPassword('password')
              }}>Demo User</button>
            </div>
            </span>
        </form>
      );
};

export default LoginForm;
