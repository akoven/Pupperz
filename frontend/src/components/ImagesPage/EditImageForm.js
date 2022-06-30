import { useHistory, useParams} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { editImage } from "../../store/image";

const EditImageForm = () =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {albumId, imageId} = useParams();


    const image = useSelector(state => state.images[imageId]);
    const album = useSelector(state => state.albums[albumId]);
    const sessionUser = useSelector(state => state.session.user);

    // console.log('id: ', image.id);
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async e =>{
        e.preventDefault();
        const payload = {
            ...image,
            imageUrl,
            content
        };
        console.log(payload);
        console.log('image object ',image);
        console.log('album object', album);
        console.log('userId: ', sessionUser.id);
        console.log('albumId: ',album.id);
        console.log('imageId: ',image.id);
        console.log('editImage thunk not dispatched');
        const editedImage = await dispatch(editImage(payload, {userId:sessionUser.id}, {albumId:album.id}));
        console.log('editImage thunk dispatched');
        if(editedImage){
            history.push(`/albums/${albumId}/images`);
        };
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Image Url:
                    <input
                    type='text'
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Content:
                    <textarea
                    type='text'
                    value={content}
                    onChange={e => setContent(e.target.value)}></textarea>
                </label>
                <button type="submit">Submit Changes</button>
                <button onClick={() => history.push(`/albums/${albumId}/images`)}>Cancel</button>
            </form>
            <img src={imageUrl} alt='image here'/>
        </>
    )
};

export default EditImageForm;
