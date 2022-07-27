import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory,Link,NavLink } from "react-router-dom";
import * as imageEvents from '../../store/userImage';
import { displayAllImagesUserPage } from "../../store/userImage";
import {deleteUserImage} from '../../store/userImage';
import '../ImagesPage/images.css';

const AllUserImages = () =>{

    const [imageUrl, setImageUrl] = useState('');
    // const [content, setContent] = useState('');
    const [errorValidation, setErrorValidation] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => state.userImages);
    const imageArr = Object.values(images || {});
    const {userId} = useParams();


    console.log(imageArr);
    useEffect(() =>{
        if(userId){
            dispatch(displayAllImagesUserPage(userId));
        }
    }, [dispatch]);



        let errors = [];

        const handleSubmit = async e =>{
            e.preventDefault();
            const payload = {
                userId: sessionUser.id,
                // favoritesId,
                imageUrl,
                // liked: false
            };
            setImageUrl('');
            // setContent('');

            if((imageUrl.length < 4 && imageUrl.includes('jpg')) || (imageUrl.length < 5 && imageUrl.includes('jpeg')) || (!imageUrl.includes('jpeg') && !imageUrl.includes('jpg'))){
                errors.push('A valid image URL is required!');
                // console.log(imageUrl.length < 4 || !imageUrl.includes('jpeg') || !imageUrl.includes('jpg'));
                setErrorValidation(errors);
            }else{
                const newImage = await dispatch(imageEvents.createNewImageOnly(payload));
                return newImage;
            };
        };

    return(
        <div className="userImagePage">
            {/* <div><NavLink to={`/user/${sessionUser.id}/albums`}>{'<< Back to your albums'}</NavLink></div>
            <h1>{sessionUser.username}'s Photos</h1>

            <img src="https://chico.ca.us/sites/main/files/imagecache/lightbox/main-images/dog_license.jpg" alt=''/>
            <img src="https://cdn.britannica.com/49/161649-050-3F458ECF/Bernese-mountain-dog-grass.jpg?q=60" alt=''/>
            <img src="http://cdn.akc.org/content/article-body-image/lab_puppy_dog_pictures.jpg"/>
            <img src="https://media.nature.com/lw800/magazine-assets/d41586-020-01443-0/d41586-020-01443-0_17985512.jpg" alt=''/>
            <img src="https://images.dog.ceo/breeds/mountain-bernese/n02107683_3900.jpg" alt=''/>
            <img src="https://images.dog.ceo/breeds/husky/n02110185_1511.jpg" alt=''/>
            <img src="https://images.dog.ceo/breeds/rottweiler/n02106550_8994.jpg" alt=''/>
            <img src="https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_967.jpg" alt=''/>
            <img src="https://images.dog.ceo/breeds/pyrenees/n02111500_5812.jpg" alt=''/>
            <img src="https://images.dog.ceo/breeds/pekinese/n02086079_11089.jpg" alt=''/>
            <img src="https://images.dog.ceo/breeds/pembroke/n02113023_187.jpg" alt=''/>
            <img src="https://images.dog.ceo/breeds/newfoundland/n02111277_2456.jpg" alt=''/>
            <img src="https://chico.ca.us/sites/main/files/ihttps://images.dog.ceo/breeds/husky/n02110185_1511.jpgmagecache/lightbox/main-images/dog_license.jpg" alt=''/>
            <img src="https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_1240.jpg" alt=''/>
            <img src="https://images.dog.ceo/breeds/beagle/n02088364_12440.jpg" alt=''/> */}


            <h1>{sessionUser.username}'s Photos</h1>
            <h2>Let's upload some images!</h2>
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
                {/* <label>
                    Content
                    <textarea
                    type='text'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder='Optional'
                    rows='3'
                    ></textarea>
                </label> */}
                <button type='submit'>Upload That!</button>
            </form>
            {imageArr.map(image =><div key={image.id}><img src={image.imageUrl} alt='image here'/><button onClick={() => dispatch(deleteUserImage(image))}>Delete</button></div>)}
            {/*
            <div className="contentBox">{image.content}</div>
            <button onClick={() => history.push(`/`)}>Edit</button> */}
        </div>
    )
}

export default AllUserImages;
