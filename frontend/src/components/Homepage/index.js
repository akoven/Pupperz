import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import ProfileButton from "../Navigation/ProfileButton";
// import Navigation from "../Navigation";
import { displayAllAlbums } from "../../store/album";

const Homepage = () =>{

    const dispatch = useDispatch();
    const userSession = useSelector(state => state.session.user);
    const albums = useSelector(state => state.albums);
    const albumArr = Object.values(albums||{});

    useEffect(()=>{
        dispatch(displayAllAlbums())
    },[dispatch]);

    if(userSession){
        <ProfileButton user={userSession}/>
    }

    return(
        <div>
            <NavLink to='/create-album'>Create an Album</NavLink>
            <h3>{userSession.username}'s Albums</h3>
            {albumArr.map(album => <div><Link to={`/albums/${album.id}`}>{album.title}</Link></div>)}
        </div>

    )
}

export default Homepage;
