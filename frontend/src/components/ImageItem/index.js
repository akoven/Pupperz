import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { addFavoriteImage } from "../../store/favorite";
import './index.css';

const ImageItem = (props) =>{

    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const image = props.image;
    const userSession = props.userSession;

    const handleLike = (imageId) =>{
        setLiked(liked => !liked)
        const payload ={
            userId: userSession.id,
            imageId: imageId,
            liked
        };

        dispatch(addFavoriteImage(payload));

    }

    return(
        <span className="fave-image" key={image.id}>
            <img className='photos' src={image.imageUrl} alt='image-here'/>
            <button className='like-button' onClick={() => handleLike(image.id)}>{liked ? <i class='fa-solid fa-heart'/>:<i class='fa-regular fa-heart' />}</button>
        </span>
    );
}


export default ImageItem;
