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

        sessionLinks = (
            <>
                {/* <NavLink to='/create-album'>Create an Album</NavLink> */}
                {/* <Redirect to='/' /> */}
                <ProfileButton user={sessionUser} />
            </>
        )
    }else{
        sessionLinks=(
            <>
                <NavLink to='/login'><button>Log In</button></NavLink>
                <NavLink to='/signup'><button>Sign Up!</button></NavLink>
            </>
        )

    }

    return(
        <div>
            <ul>
                <li>
                    <NavLink to='/'>Pupperz</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </div>
    )
};

export default Navigation;
