import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import ProfileButton from "../Navigation/ProfileButton";
// import Navigation from "../Navigation";
import { displayAllAlbums, deleteAlbum } from "../../store/album";

const Homepage = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const userSession = useSelector(state => state.session.user);
    const albums = useSelector(state => state.albums);
    const images = useSelector(state => state.images);
    const albumArr = Object.values(albums||{});
    // const imageArr = Object.values(images||{});


    console.log('current user: ',userSession);
    useEffect(()=>{
        if(userSession){//this sets the userSession for a specific user instead of all users
            dispatch(displayAllAlbums(userSession.id));
        }
    },[dispatch, userSession]);

    if(userSession){
        <ProfileButton user={userSession}/>
        // dispatch(displayAllAlbums(userSession.id));

    }

    return(
        <div>
            <NavLink to='/create-album'>Create an Album</NavLink>
            <h3>{userSession.username}'s Albums</h3>
            {albumArr.map(album => <div><Link to={`/albums/${album.id}/images`}>{album.title}</Link><button onClick={() => history.push(`/edit-album/${album.id}`)}>Edit</button><button onClick={() => dispatch(deleteAlbum(album))}>Delete</button></div>)}
        </div>

    )
}

export default Homepage;
