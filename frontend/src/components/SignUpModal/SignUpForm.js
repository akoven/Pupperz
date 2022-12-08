import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './SignUpModal.css';

const SignUpForm = () =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to={`/logged-in/${sessionUser.id}`} />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
          setErrors([]);
          return dispatch(sessionActions.signUpUser({ email, username, password }))
            .catch(async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
      };

      return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='email'>
                    <label className='email-label'>
                        Email
                        <input
                        className='email-field'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div className='username'>
                    <label className='username-label'>
                        Username
                        <input
                        className='username-field'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div className='password'>
                    <label className='password-label'>
                        Password
                        <input
                        className='password-field'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div className='confirmation'>
                    <label className='confirm-label'>
                        Confirm Password
                        <input
                        className='confirm-password-field'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div className='button'>
                    <button className='sign-up-btn' type="submit">Sign Up</button>
                </div>
            </form>
        </div>

      );
}

export default SignUpForm;
