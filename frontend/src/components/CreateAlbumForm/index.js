import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import { createAlbum } from '../../store/album';
import * as albumEvents from '../../store/album';
import './index.css'

const CreateAlbumForm = () =>{
 const dispatch = useDispatch();
 const history = useHistory();
 const sessionUser = useSelector(state => state.session.user);

 const [title, setTitle] = useState('');
 const [errorValidation, setErrorValidation] = useState([]);
 const {userId} = useParams();
 let errors = [];

 const handleSubmit = async (e) =>{
    e.preventDefault();
    const newAlbum = await dispatch(albumEvents.createAlbum({userId:sessionUser.id,title}));
    if (title.length > 20){
        errors.push('Title must be between 1 and 20 charactures long');
        setErrorValidation(errors);
    }
    if(title.length === 0){
        errors.push('Please provide a title!');
        setErrorValidation(errors);
    }

    if(newAlbum){
        history.push(`/user/${userId}/albums`);
    }
 }

 if(sessionUser){
     return(
        <form onSubmit={handleSubmit}>
            <ul>
                {errorValidation.map((error,id) => <li key={id}>{error}</li>)}
            </ul>
            <label className='album-name-label'>
                Album Name
                <input
                className='album-name-input'
                type='string'
                value ={title}
                onChange={e=>setTitle(e.target.value)}
                required/>
            </label>
            <button className='create-album-btn' type='submit'>Submit</button>
            <button className='cancel-create-album' onClick={() => history.push(`/user/${userId}/albums`)}>Cancel</button>
        </form>
     )
 }
 return null;
}

export default CreateAlbumForm;
