import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import './Navigation.css';

const Navigation = ({isLoaded}) =>{

    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if(sessionUser){

        sessionLinks = (
            <>
                <NavLink to='/create-album'>Create an Album</NavLink>
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
                    <NavLink to='/'>Home</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </div>
    )
};

export default Navigation;
