import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { loadAllLiked } from "../../store/favorite";

const Favorites = () =>{

    const {userId} = useParams();
    const images = useSelector(state => state.favorites);
    const imageArr = Object.values(images||{});

    const dispatch = useDispatch();

    useEffect(()=>{
      if(userId){
        dispatch(loadAllLiked(images));
      }
    },[dispatch]);

    return(
      <div>
        <NavLink to={`/logged-in/${userId}`}>{'<< Back to Home'}</NavLink>
        {imageArr.map(image =><div><img src={image.imageUrl} alt='image here'/><button>Unlike</button></div>)}
      </div>
    );
}

export default Favorites;
