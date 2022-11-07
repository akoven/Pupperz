import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
// import ProfileModal from "../ProfileModal";
import { NavLink, Link, Redirect } from "react-router-dom";
// import SplashPage from "../SplashPage";
import './Navigation.css';

const Navigation = ({isLoaded}) =>{

    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if(sessionUser){
        //try `/logged-in/${sessionUser.id}`
        // <Redirect to={`/logged-in/${sessionUser.id}`} />
        // to={`/logged-in/${sessionUser.id}`}
        sessionLinks = (
            <>
                <span><NavLink to={`/logged-in/${sessionUser.id}`} className="title">Pupperz</NavLink></span>
                <span className="albumSpan"><NavLink className='create-album-label' to={`/create-album/${sessionUser.id}`}>Create an Album</NavLink></span>
                <ProfileButton user={sessionUser} />
                {/* <ProfileModal user={sessionUser}/> */}
                <Redirect to={`/logged-in/${sessionUser.id}`} />
            </>
        );
    }else{
        sessionLinks=(
            <>
                <NavLink to='/' exact><div className="title">Pupperz</div></NavLink>
                {/* <span id="nav-button"><NavLink to='/login'><button className="nav-button">Log In</button></NavLink></span> */}
                {/* <NavLink to='/signup'><button className="nav-button">Sign Up!</button></NavLink> */}
                <span id="nav-button"><LoginFormModal /><span className="signup-button"><SignUpModal /></span></span>
                {/* <SplashPage /> */}
                {/* <footer className="footer"><span><NavLink to={'/about-me'}>About Me</NavLink></span><span><NavLink to ='/jobs'>Jobs</NavLink></span><span><NavLink to='/blog'>Blog</NavLink></span><span><NavLink to='/developers'>Developers</NavLink></span><span><NavLink to='/guidelines'>Guidelines</NavLink></span><span><NavLink to='/privacy'>Privacy</NavLink></span><span><NavLink to='/terms'>Terms</NavLink></span><span><NavLink to='/help'>Help</NavLink></span><span><NavLink to='/language'>English</NavLink></span></footer> */}
            </>
        )

    };





    return(
        <div className="header">
            {isLoaded && sessionLinks}
            {/* https://nypost.com/wp-content/uploads/sites/2/2019/01/boo-dog.jpg?quality=75&strip=all */}

            {/* <ul>
                <li>
                {isLoaded && sessionLinks}
                </li>
            </ul> */}
            {/* <span>Jobs</span><span>Blog</span><span>Developers</span><span>Guidelines</span><span>Privacy</span> */}
        </div>

    )
};

export default Navigation;
