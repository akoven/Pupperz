import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addFavoriteImage, deleteLikedImage } from "../../store/favorite";
import { csrfFetch } from "../../store/csrf";
import './index.css';

const ImageItem = (props) =>{

    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    // const likes = props.liked;
    const image = props.image;
    const userSession = props.userSession;
    const history = useHistory();
    // const currentFaves = useSelector(state => state.favorites);
    // const allLikes = useSelector(state => state.likesOnly);

    // useEffect(() =>{
    //     Object.values(allLikes).forEach(like => {
    //         console.log('likes from image item component ',like)
    //         if(like.imageId === image.id){
    //             setLiked(like.liked)
    //             return
    //         }
    //     })
    // }, [allLikes, userSession.id]);

    useEffect(() => {
        (async () => {
            const response = await csrfFetch(`/api/favorites/likes/${userSession.id}/${image.id}`);
            if(response.ok){
                const faveStats = await response.json();
                if(faveStats.status){
                    setLiked(true)
                }else{
                    setLiked(false)
                }
            }
        })()

    },[]);


    const handleLike = (imageId) =>{
        const payload ={
            userId: userSession.id,
            imageId: imageId,
            liked: !liked
        };
        // if(liked){
        //     setLiked(false);
        // }else{
        //     setLiked(true);
        // };
        console.log('liked?? ',!liked);
        if(!liked){
            dispatch(addFavoriteImage(payload));
            // setLiked(payload.liked);
        }else{
            dispatch(deleteLikedImage(userSession.id,imageId));
        }
        return setLiked

    };

    // const handleLike = async () =>{
    //     const payload = {
    //         userId:userSession.id,
    //         imageId:image.id
    //     }
    //     setLiked(true);
    //     dispatch(addFavoriteImage(payload,liked))
    // }

    // const handleUnLike = async () =>{
    //     setLiked(false);
    //     dispatch(deleteLikedImage(userSession.id, image.id))
    // }

    return(
        <span className="fave-image" key={image.id}>
            <img className='photos' src={image.imageUrl} alt='image-here' onClick={() => history.push(`/comments/${userSession.id}/${image.id}`)}/>
            <button className='like-button' onClick={() => {
                handleLike(image.id)
                {setLiked(!liked)}
            }}>
                {liked ? <i style={{'color':'#E6293F'}} class='fa-solid fa-heart'/>:<i class='fa-regular fa-heart' />}
            </button>

        </span>
    );
}


export default ImageItem;
