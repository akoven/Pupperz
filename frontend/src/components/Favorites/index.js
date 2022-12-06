import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { loadFavorites } from "../../store/favorite";
import './index.css';

const Favorites = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const {userId} = useParams();
    // const userSession = useSelector(state => state.session.user);
    const images = useSelector(state => state.images);
    const favorites = useSelector(state => state.favorites);
    const favoriteArr = Object.values(favorites||{});

    // const payload={
    //       userId
    // };


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

    useEffect(() =>{
      dispatch(loadFavorites(userId));
      // console.log(typeof(userId))
      // console.log(typeof(payload.userId))
      // console.log('favorites array ',favoriteArr)
    },[dispatch])

    return(
      <div className="faves-pg-background">
        {/* <NavLink className='user-homepage' to={`/logged-in/${userId}`}>{'<< Back to Home'}</NavLink> */}
        {/* {imageArr.map(image =><div><img src={image.imageUrl} alt='image here'/><button>Unlike</button></div>)} */}
        {/* <button onClick={() => dispatch(createFavoritesFolder(payload))}>{'Create New Favorites Folder'}</button> */}
        {/* {favoriteArr.map(item => <div><NavLink to={`/user/${userSession.id}/my-faves/${item.id}`}>Favorites ❤️</NavLink></div>)} */}
        <h1 className="favorites-header">Favorites ❤️</h1>
        {favoriteArr.map(image => <div className="fave-img-div"><img onClick={() => history.push(`/comments/${userId}/${image.id}`)} className='fave-image' src={image.imageUrl}/></div>)}
      </div>
    );
}

export default Favorites;
