import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from 'react-router-dom';
import { editAlbum } from "../../store/album";
import './editAlbum.css';

const EditAlbumForm = () =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {albumId} = useParams();

    const album = useSelector(state => state.albums[albumId]);
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState(album.title);
    const [errorValidation, setErrorValidation] = useState([]);

    let errors = [];


    const handleSubmit = async e =>{
        e.preventDefault();
        const payload = {
            ...album,
            title
        };
        // console.log(album);

        const editedAlbum = await dispatch(editAlbum(payload,{userId:sessionUser.id}));
        if (title.length > 20){
            errors.push('Title must be between 1 and 20 charactures long');
            setErrorValidation(errors);
        };

        if(title.length === 0){
            errors.push('Please provide a new title!');
            setErrorValidation(errors);
        };

        if(editedAlbum){
            history.push(`/user/${sessionUser.id}/albums`);
        };
    };

    return(

        <form onSubmit={handleSubmit}>
            <ul>
                {errorValidation.map((error,id) => <li key={id}>{error}</li>)}
            </ul>
            <label className="album-title-label">
                Album Title
            </label>
            <input
                type='string'
                className="album-title-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required/>
            <button type='submit' className='submit-album-changes' disabled={errorValidation.length > 0}>Submit Changes</button>
            <button className='cancel-album-changes' onClick={() => history.push(`/user/${sessionUser.id}/albums`)}>Cancel</button>
        </form>

    );
};

export default EditAlbumForm;
