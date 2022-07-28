import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to={`/logged-in/${sessionUser.id}`} />
  );

  const handleSubmit = (e) => {
    // console.log('running handleSubmit function ', credential,password);
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

  }

  return (
    <div>

        <form onSubmit={handleSubmit} className='background'>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label className='credential-input'>
                Username or Email:
                <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                />
            </label>
            <label className='password-input'>
                Password:
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <div>
              <div className='login-button'>
                <button type="submit">Log In</button>
              </div>
              <div className='demo-button'>
                <button onClick={() =>{
                    setCredential('Demo-lition')
                    setPassword('password')
                }}>Demo User</button>
              </div>
            </div>
        </form>
    </div>

  );
}

export default LoginFormPage;
