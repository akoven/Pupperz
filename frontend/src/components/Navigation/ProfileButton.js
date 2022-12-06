import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
// import { useSelector } from "react-redux";

const ProfileButton = ({user}) =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);


    const openMenu = () =>{
        console.log('SHOW MENU: ',showMenu)
        if(showMenu) return;
        setShowMenu(true);
        console.log('SET TO TRUE? ',showMenu)
    };

    // useEffect(() =>{
    //     console.log('use effect before set show menu command: ',showMenu)
    //     debugger
    //     if(!showMenu) return;
    //     const closeMenu = () =>{
    //         console.log('within closeMenu function: ',showMenu)
    //         setShowMenu(false)
    //     }
    //     document.addEventListener('click', closeMenu);
    //     return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
      };

      return (
        <>
          <button className='user-profile-btn' onClick={openMenu}>
            <i class="fa-solid fa-user" />
          </button>
          {showMenu && (
            <div className="profile-dropdown">
              <button onClick={() => setShowMenu(false)} className='close-profile-menu'>x</button>
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div>
                <button className='logout-btn-nav-bar' onClick={logout}>Log Out</button>
              </div>
            </div>
          )}
        </>
      );
};

export default ProfileButton;
