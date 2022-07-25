import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileButton from "../Navigation/ProfileButton";
// import Navigation from "../Navigation";
// import { displayAllAlbums } from "../../store/album";
import { displayAllImagesHomePage } from "../../store/userImage";
import { createLikedImage } from "../../store/favorite";
import './homepage.css';

const Homepage = () =>{

    const dispatch = useDispatch();
    // const history = useHistory();
    const userSession = useSelector(state => state.session.user);
    // const albums = useSelector(state => state.albums);
    const images = useSelector(state => state.userImages);
    // const albumArr = Object.values(albums||{});
    const imageArr = Object.values(images||{});

    // console.log('imageArr for homepage: ', imageArr);
    const [liked, setLiked] = useState(false);



    // console.log('current user: ',userSession);
    // useEffect(()=>{
    //     if(userSession){//this sets the userSession for a specific user instead of all users
    //         dispatch(displayAllAlbums(userSession.id));
    //         console.log('current user ',userSession.id)
    //     }
    // },[dispatch, userSession]);

    useEffect(()=>{
        if(userSession){
            dispatch(displayAllImagesHomePage(images))
        };
    },[dispatch])

    if(userSession){
        <ProfileButton user={userSession}/>
        // dispatch(displayAllAlbums(userSession.id));
    };

    // const handleLike = () =>{
    //     const payload ={
    //         userId: userSession.id,
    //         images,
    //         liked
    //     };

    //     dispatch(createLikedImage(payload));


    // }





    return(
        <div>
            {/* <NavLink to={`/create-album/${userSession.id}`}>Create an Album</NavLink> */}
            {/* <NavLink to={`/`}></NavLink> */}
            <h3 className="intro-message">Welcome back {userSession.username}!</h3>
            <span><NavLink to={`/user/${userSession.id}/albums`} className='albums'>See your albums</NavLink><NavLink to={`/user/${userSession.id}/all-images`} className='images'>See your images</NavLink><NavLink to={`/user/${userSession.id}/my-faves`} className='images'>See your favorites</NavLink></span>
            {/* {albumArr.map(album => <div><Link to={`/albums/${album.id}/images`}>{album.title}</Link><button onClick={() => history.push(`/edit-album/${album.id}`)}>Edit</button><button onClick={() => dispatch(deleteAlbum(album))}>Delete</button></div>)} */}
            {/* <div>
                <img src="https://media.nature.com/lw800/magazine-assets/d41586-020-01443-0/d41586-020-01443-0_17985512.jpg" alt=''/>
                <img src="https://images.dog.ceo/breeds/pyrenees/n02111500_5812.jpg" alt=''/>
                <img src="https://chico.ca.us/sites/main/files/imagecache/lightbox/main-images/dog_license.jpg" alt=''/>
                <img src="https://images.dog.ceo/breeds/beagle/n02088364_12440.jpg" alt=''/>
                <img src="http://cdn.akc.org/content/article-body-image/lab_puppy_dog_pictures.jpg"/>
                <img src="https://images.dog.ceo/breeds/rottweiler/n02106550_8994.jpg" alt=''/>
                <img src="https://images.dog.ceo/breeds/newfoundland/n02111277_2456.jpg" alt=''/>
                <img src="https://images.dog.ceo/breeds/husky/n02110185_1511.jpg" alt=''/>
                <img src="https://cdn.britannica.com/49/161649-050-3F458ECF/Bernese-mountain-dog-grass.jpg?q=60" alt=''/>
                <img src="https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_967.jpg" alt=''/>
                <img src="https://images.dog.ceo/breeds/mountain-bernese/n02107683_3900.jpg" alt=''/>
                <img src="https://images.dog.ceo/breeds/pekinese/n02086079_11089.jpg" alt=''/>
                <img src="https://images.dog.ceo/breeds/pembroke/n02113023_187.jpg" alt=''/>
                <img src="https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_1240.jpg" alt=''/>
            </div> */}

            {imageArr.map(image =><div className="images" key={image.id}><img src={image.imageUrl} alt='image-here'/><button onClick={() =>{
                setLiked(true);

                const payload ={
                    userId: image.userId,
                    imageId: image.id,
                    imageUrl: image.imageUrl,
                    liked
                };

                dispatch(createLikedImage(payload));

            }}>Like!</button></div>)}
        </div>

    )
}

export default Homepage;
