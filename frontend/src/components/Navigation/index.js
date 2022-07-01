import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProfileButton from "./ProfileButton";
import { NavLink, Link, Redirect } from "react-router-dom";
// import { displayAllAlbums } from "../../store/album";
import './Navigation.css';

const Navigation = ({isLoaded}) =>{

    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if(sessionUser){
        //try `/logged-in/${sessionUser.id}`
        sessionLinks = (
            <>
                <NavLink to={`/logged-in/${sessionUser.id}`}>Pupperz</NavLink>
                {/* <Redirect to='/' /> */}
                <ProfileButton user={sessionUser} />
                <span className="albumSpan"><NavLink to={`/create-album/${sessionUser.id}`}>Create an Album</NavLink></span>
                <span className="imageSpan"><NavLink to={`/`}>Upload an Image</NavLink></span>
                <div><NavLink to={`/logged-in/${sessionUser.id}`}>{'<< Back To Home'}</NavLink></div>

            </>
        )
    }else{
        sessionLinks=(
            <>
                <NavLink to='/'>Pupperz</NavLink>
                <NavLink to='/login'><button>Log In</button></NavLink>
                <NavLink to='/signup'><button>Sign Up!</button></NavLink>
            </>
        )

    };





    return(
        <div>
            {isLoaded && sessionLinks}
            {/* <ul>
                <li>
                    {isLoaded && sessionLinks}
                </li>
            </ul> */}
        </div>
    )
};

export default Navigation;
