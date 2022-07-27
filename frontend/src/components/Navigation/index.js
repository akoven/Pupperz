import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
import { NavLink, Link, Redirect } from "react-router-dom";
import SplashPage from "../SplashPage";
import './Navigation.css';

const Navigation = ({isLoaded}) =>{

    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if(sessionUser){
        //try `/logged-in/${sessionUser.id}`
        // <Redirect to={`/logged-in/${sessionUser.id}`} />
        sessionLinks = (
            <>
                <span className="title"><Link to={`/logged-in/${sessionUser.id}`}>Pupperz</Link></span>
                <span className="albumSpan"><NavLink to={`/create-album/${sessionUser.id}`}>Create an Album</NavLink></span>
                <ProfileButton user={sessionUser} />
                <Redirect to={`/logged-in/${sessionUser.id}`} />
            </>
        );
    }else{
        sessionLinks=(
            <>
                <NavLink to='/' exact><div className="title">Pupperz</div></NavLink>
                {/* <span id="nav-button"><NavLink to='/login'><button className="nav-button">Log In</button></NavLink></span> */}
                {/* <NavLink to='/signup'><button className="nav-button">Sign Up!</button></NavLink> */}
                <span id="nav-button"><LoginFormModal /><SignUpModal /></span>
                <SplashPage />
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
