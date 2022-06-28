import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProfileButton from "./ProfileButton";
import { NavLink, Link } from "react-router-dom";
import { displayAllAlbums } from "../../store/album";
import './Navigation.css';

const Navigation = ({isLoaded}) =>{

    // const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector(state => state.albums);
    const albumArr = Object.values(albums||{});

    // useEffect(()=>{
    //     dispatch(displayAllAlbums())
    // },[dispatch])

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
                    <NavLink to='/'>Pupperz</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
            <h3>Albums</h3>
            {albumArr.map(album => <div><Link to={`/albums/${album.id}`}>{album.title}</Link></div>)}
        </div>
    )
};

export default Navigation;
