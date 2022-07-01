import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { displayAllImagesUserPage } from "../../store/image";

const AllUserImages = () =>{
    const dispatch = useDispatch();
    const userSession = useSelector(state => state.session.user);
    const images = useSelector(state => state.images);
    const imageArr = Object.values(images || {});
    const {userId} = useParams();

    useEffect(() =>{
        if(userSession){
            dispatch(displayAllImagesUserPage(userId));
            console.log(userId);
        }
    }, [dispatch, userSession]);

    return(
        <div>
            <h3>{userSession.username}'s Images</h3>
            {imageArr?.map(image => <img src={image.imageUrl} alt='image?' />)}
        </div>
    )
}

export default AllUserImages;
