import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams, useHistory} from 'react-router-dom';
import { editAlbum } from "../../store/album";

const EditAlbumForm = () =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = useParams();

    const album = useSelector(state => state.albums[id]);
    const sessionUser = useSelector(state => state.session.user);
    // console.log(album.title);
    // console.log('selected Id: ',id);
    const [title, setTitle] = useState(album.title);
    const [errorValidation, setErrorValidation] = useState([]);

    let errors = [];

    // useEffect((album) => {
    //     dispatch(getOneAlbum(album))
    // }, [dispatch]);

    const handleSubmit = e =>{
        e.preventDefault();
        const payload = {
            ...album,
            title
        };
        console.log(payload);

        const editedAlbum = dispatch(editAlbum(payload,{userId:sessionUser.id}));
        if (title.length > 20){
            errors.push('Title must be between 1 and 20 charactures long');
            setErrorValidation(errors);
        };

        if(title.length === 0){
            errors.push('Please provide a new title!');
            setErrorValidation(errors);
        };

        if(editedAlbum){
            history.push(`/logged-in/${sessionUser.id}`);
        };
    };

    return(
        <form onSubmit={handleSubmit}>
            <ul>
                {errorValidation.map((error,id) => <li key={id}>{error}</li>)}
            </ul>
            <label>
                Album Title:
                <input
                type='string'
                value={title}
                onChange={e => setTitle(e.target.value)}
                required/>
            </label>
            <button type='submit' disabled={errorValidation.length > 0}>Submit Changes</button>
            <button onClick={() => history.push(`/logged-in/${sessionUser.id}`)}>Cancel</button>
        </form>
    )
}

export default EditAlbumForm;
