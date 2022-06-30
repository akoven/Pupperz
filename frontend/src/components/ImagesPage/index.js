import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as imageEvents from '../../store/image';
import { displayAllImages } from "../../store/image";
import './images.css';

const ImagesPage = () =>{

    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => state.images);
    const {albumId} = useParams();
    const imageArr = Object.values(images||{});

    // console.log('current album id: ', albumId);

        useEffect(() => {
            if(sessionUser){
                dispatch(displayAllImages())
            }
        }, [dispatch, sessionUser]);

    const handleSubmit = async e =>{
        e.preventDefault();
        const payload = {
            userId: sessionUser.id,
            albumId:albumId,
            imageUrl,
            content
        };
        console.log(payload);
        // console.log('current user id: ',{userId:sessionUser.id})
        const newImage = await dispatch(imageEvents.createNewImage(payload));
        setImageUrl('');
        setContent('');
        return newImage;
    }

    return(
        <div className="imagePage">
            <h1>Let's upload some images!</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Image Url
                    <input
                    type='text'
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    required
                    />
                </label>
                <label>
                    Content
                    <textarea
                    type='text'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder='Optional'
                    rows='3'
                    ></textarea>
                </label>
                <button type='submit'>Upload That!</button>
            </form>
            {imageArr.map(image =><div><img src={image.imageUrl} alt='image here'/><button onClick={() => history.push(`/edit-image/${albumId}/${image.id}`)}>Edit</button><button onClick={() => null}>Delete</button></div>)}
        </div>
    )
}

export default ImagesPage;
