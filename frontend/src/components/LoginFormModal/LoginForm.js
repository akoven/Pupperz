import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
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
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <span>
            <div className='login-button'>
              <button type="submit">Log In</button>
            </div>
            <div>
              <button onClick={() =>{
                  setCredential('Demo-lition')
                  setPassword('password')
              }}>Demo User</button>
            </div>
            </span>
        </form>
      );
};

export default LoginForm;
