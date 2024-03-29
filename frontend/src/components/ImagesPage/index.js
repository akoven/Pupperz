import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory,Link,NavLink } from "react-router-dom";
import * as imageEvents from '../../store/image';
import { displayAllImages } from "../../store/image";
import {deleteImage} from '../../store/image';
import './images.css';

const ImagesPage = () =>{

    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const [errorValidation, setErrorValidation] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => state.images);
    const {albumId} = useParams();
    const imageArr = Object.values(images||{});

    // const regexUrl = /https:\\(\w|\W)+(jpeg|jpg)$/;

    // console.log('images: ', images);
    // console.log('Ids match?: ', albumId === images.albumId);

        // useEffect(() => {
        //     if(sessionUser){
        //         dispatch(displayAllImages())
        //     }
        // }, [dispatch, sessionUser]);

        useEffect(() =>{
            if(albumId){
                dispatch(displayAllImages(albumId));
                // console.log('current images state from ImagesPage: ',images);
            }
        }, [dispatch]);

    let errors = [];

    const handleSubmit = async e =>{
        e.preventDefault();
        const payload = {
            userId: sessionUser.id,
            albumId:albumId,
            imageUrl,
            content
        };
        // const newImage = await dispatch(imageEvents.createNewImage(payload));
        // console.log(payload);
        // console.log('current user id: ',{userId:sessionUser.id})
        // if(imageUrl.length === 0){
            //     errors.push('An image URL is required!');
            //     setErrorValidation(errors);
            // };
            // if(regexUrl.test(imageUrl) === false){
                //     errors.push('You need to provide a proper URL');
                //     setErrorValidation(errors);
                // };

        setImageUrl('');
        setContent('');

        if((imageUrl.length < 4 && imageUrl.includes('jpg')) || (imageUrl.length < 5 && imageUrl.includes('jpeg')) || (!imageUrl.includes('jpeg') && !imageUrl.includes('jpg'))){
            errors.push('A valid image URL is required!');
            // console.log(imageUrl.length < 4 || !imageUrl.includes('jpeg') || !imageUrl.includes('jpg'));
            setErrorValidation(errors);
        }else{
            const newImage = await dispatch(imageEvents.createNewImage(payload));
            return newImage;
        };
    };

    return(
        <div className="imagePage">
            <div className="nav-to-albums"><NavLink className='back-to-albums' to={`/user/${sessionUser.id}/albums`}>{'<< Back to your albums'}</NavLink></div>
            <h1 className="album-img-header">Let's upload some images!</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errorValidation.map((error,id) => <li key={id}>{error}</li>)}
                </ul>
                <label className="album-img-label">
                    Image Url
                    <input
                    className="album-img-input"
                    type='text'
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    required
                    />
                </label>
                <label className="album-img-content-label">
                    Content
                    <textarea
                    className="album-img-content-input"
                    type='text'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder='Optional'
                    rows='3'
                    ></textarea>
                </label>
                <button type='submit' className="album-img-submit">Upload That!</button>
            </form>
            {imageArr.map(image =><div className="album-img-div"><img className='album-img' src={image.imageUrl} alt='image here'/><div className="contentBox">{image.content}</div><button className = 'album-img-edit-btn' onClick={() => history.push(`/edit-image/${albumId}/${image.id}`)}>Edit</button><button className = 'album-img-delete-btn' onClick={() => dispatch(deleteImage(image))}>Delete</button></div>)}
        </div>
    )
}

export default ImagesPage;
