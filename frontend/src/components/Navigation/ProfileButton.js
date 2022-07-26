import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import { useSelector } from "react-redux";

const ProfileButton = ({user}) =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    // const faveImages = useSelector(state => state.Favorite);

    const openMenu = () =>{
        if(showMenu) return;
        setShowMenu(true);
    };

    useEffect(() =>{
        if(!showMenu) return;
        const closeMenu = () =>{
            setShowMenu(false)
        }
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
      };

      return (
        <>
          <button onClick={openMenu}>
            <i className="fa-solid fa-bars" />
          </button>
          {showMenu && (
            <ul className="profile-dropdown">
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </ul>
          )}
        </>
      );
};

export default ProfileButton;
