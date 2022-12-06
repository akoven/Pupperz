import { useHistory, useParams} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { editImage } from "../../store/image";
import './editImg.css';

const EditImageForm = () =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {albumId, imageId} = useParams();


    const image = useSelector(state => state.images[imageId]);
    const album = useSelector(state => state.albums[albumId]);
    const sessionUser = useSelector(state => state.session.user);

    // console.log('id: ', image.id);
    const [imageUrl, setImageUrl] = useState(image.imageUrl);
    const [content, setContent] = useState(image.content);
    const [errorValidation, setErrorValidation] = useState([]);

    let errors = [];

    const handleSubmit = async e =>{
        e.preventDefault();
        const payload = {
            ...image,
            imageUrl,
            content
        };
        // console.log(payload);
        // console.log('image object ',image);
        // console.log('album object', album);
        // console.log('userId: ', sessionUser.id);
        // console.log('albumId: ',album.id);
        // console.log('imageId: ',image.id);
        // console.log('editImage thunk not dispatched');
        const editedImage = await dispatch(editImage(payload, {userId:sessionUser.id}, {albumId:album.id}));
        console.log('sessionUser Id: ', sessionUser.id);
        if(imageUrl.length === 0){
            errors.push('Image URL is required!');
            setErrorValidation(errors);
        }
        if(editedImage){
            history.push(`/albums/${albumId}/images`);
        };
    };

    return(
        <div className="edit-album-img-pg">
            <form onSubmit={handleSubmit}>
                <ul>
                    {errorValidation.map((error,id) => <li key={id}>{error}</li>)}
                </ul>
                <label className="edit-album-img-label">
                    Image Url
                    <input
                    className="edit-album-img-input"
                    type='text'
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    required
                    />
                </label>
                <label className="edit-album-content-label">
                    Content
                    <textarea
                    className="edit-album-content-input"
                    type='text'
                    value={content}
                    onChange={e => setContent(e.target.value)}></textarea>
                </label>
                <button className='submit-changes-btn' type="submit">Submit Changes</button>
                <button className='edit-album-img-cancel-btn' onClick={() => history.push(`/albums/${albumId}/images`)}>Cancel</button>
            </form>
            <img src={imageUrl} alt='image here' className="edit-album-img"/>
        </div>
    )
};

export default EditImageForm;
