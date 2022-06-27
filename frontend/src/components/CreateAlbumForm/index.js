import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAlbum } from '../../store/album';
import * as albumEvents from '../../store/album';

const createAlbumForm = () =>{
 const dispatch = useDispatch();
 const sessionUser = useSelector(state => state.session.user);

 const [title, setTitle] = useState('');
 const [errorValidation, setErrorValidation] = useState([]);

 let errors = [];

 const handleSubmit = () =>{
    if (title.length > 20){
        errors.push('Title must be between 1 and 20 charactures long');
        setErrorValidation(errors);
    }
 }

 if(sessionUser){
     return(
        <form onSubmit={handleSubmit}>
            <ul>
                {errorValidation.map((error,id) => <li key={id}>{error}</li>)}
            </ul>
            <label>
                Album Name:
                <input
                type='string'
                value ={title}
                onChange={e=>setTitle(e.target.value)}
                required/>
            </label>
        </form>
     )
 }
 return null;
}
