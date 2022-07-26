import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { createFavoritesFolder } from "../../store/favorite";

const Favorites = () =>{

    const {userId} = useParams();
    const userSession = useSelector(state => state.session.user);
    const favorite = useSelector(state => state.favorites);
    const favoriteArr = Object.values(favorite||{});

    const payload={
          userId: userSession.id,
    };
    const dispatch = useDispatch();

    // useEffect(()=>{
    //   const payload={
    //     userId: userSession.id,
    //     title:'my-favorites'
    //   }
    //   if(userId){
    //     dispatch(createFavoritesFolder(payload));
    //   }
    //   return null;
    // },[userSession.id]);

    return(
      <div>
        <NavLink to={`/logged-in/${userId}`}>{'<< Back to Home'}</NavLink>
        {/* {imageArr.map(image =><div><img src={image.imageUrl} alt='image here'/><button>Unlike</button></div>)} */}
        <button onClick={() => dispatch(createFavoritesFolder(payload))}>{'Create New Favorites Folder'}</button>
        {favoriteArr.map(item => <div><NavLink to={`/user/${userSession.id}/my-faves/${item.id}`}>Favorites ❤️</NavLink></div>)}

      </div>
    );
}

export default Favorites;
