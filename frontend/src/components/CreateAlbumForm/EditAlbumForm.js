import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from 'react-router-dom';
import { editAlbum } from "../../store/album";

const EditAlbumForm = () =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = useParams();

    const album = useSelector(state => state.albums[id]);
    // console.log(album.title);
    // console.log('selected Id: ',id);
    const [newTitle, setNewTitle] = useState(album.title);
    const [errorValidation, setErrorValidation] = useState([]);

    let errors = [];

    // useEffect((album) => {
    //     dispatch(getOneAlbum(album))
    // }, [dispatch]);

    const handleSubmit = e =>{
        e.preventDefault();
        const payload = {
            ...album,
            newTitle
        };

        const editedAlbum = dispatch(editAlbum(payload));
        if (newTitle.length > 20){
            errors.push('Title must be between 1 and 20 charactures long');
            setErrorValidation(errors);
        }

        if(newTitle.length === 0){
            errors.push('Please provide a new title!');
            setErrorValidation(errors);
        }

        if(editedAlbum){
            history.push('/logged-in');
        }
        if(errorValidation){

        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <ul>
                {errorValidation.map((error,id) => <li key={id}>{error}</li>)}
            </ul>
            <label>
                Album Title:
                <input
                type='string'
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required/>
            </label>
            <button type='submit' disabled={errors.length > 0}>Submit Changes</button>
            <button onClick={() => history.push('/logged-in')}>Cancel</button>
        </form>
    )
}

export default EditAlbumForm;
