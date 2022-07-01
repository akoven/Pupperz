import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory,Link,NavLink } from "react-router-dom";
import * as imageEvents from '../../store/image';
import { displayAllImagesUserPage } from "../../store/image";
import {deleteImage} from '../../store/image';
import './images.css';

const AllUserImages = () =>{

    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const [errorValidation, setErrorValidation] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => state.images);
    const {albumId} = useParams();
    const imageArr = Object.values(images||{});
    const {userId} = useParams();




    useEffect(() =>{
        if(userId){
            dispatch(displayAllImagesUserPage(userId));
            console.log('user id: ',userId);
            console.log('dispatched action from AllUserImages component')
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

        console.log(payload);

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
        <div className="userImagePage">
            <div><NavLink to={`/user/${sessionUser.id}/albums`}>{'<< Back to your albums'}</NavLink></div>
            <h1>Let's upload some images!</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errorValidation.map((error,id) => <li key={id}>{error}</li>)}
                </ul>
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
            {imageArr.map(image =><div><img src={image.imageUrl} alt='image here'/><div className="contentBox">{image.content}</div><button onClick={() => history.push(`/edit-image/${albumId}/${image.id}`)}>Edit</button><button onClick={() => dispatch(deleteImage(image))}>Delete</button></div>)}
        </div>
    )
}

export default AllUserImages;
