import { useDispatch,useSelector } from "react-redux";
import { useHistory, NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileButton from "../Navigation/ProfileButton";
import { displayAllAlbums, deleteAlbum } from "../../store/album";
import './AlbumsPage.css';

const AlbumsPage = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const userSession = useSelector(state => state.session.user);
    const albums = useSelector(state => state.albums);
    // const images = useSelector(state => state.images);
    const albumArr = Object.values(albums||{});

    useEffect(()=>{
        if(userSession){//this sets the userSession for a specific user instead of all users
            dispatch(displayAllAlbums(userSession.id));
            // console.log('current user ',userSession.id)
        }
    },[dispatch, userSession]);

    if(userSession){
        <ProfileButton user={userSession}/>
        // dispatch(displayAllAlbums(userSession.id));

    };

    return(
        <div>
            {/* {<div className="home-nav"><NavLink to={`/logged-in/${userSession.id}`}>{'<< Back To Home'}</NavLink></div>} */}
            <h3>{userSession.username}'s Albums</h3>
            {albumArr?.map(album => <div className="new-album"><Link className='album-title' to={`/albums/${album.id}/images`}>{album.title}🐾</Link><button className='edit-album-btn' onClick={() => history.push(`/edit-album/${album.id}`)}>Edit</button><button className='delete-album-btn' onClick={() => dispatch(deleteAlbum(album))}>Delete</button></div>)}
        </div>
    );
}


export default AlbumsPage;
