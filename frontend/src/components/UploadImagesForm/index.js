import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as imageEvents from '../../store/image';

const UploadImagesForm = () =>{

    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const {id} = useParams();

    const handleSubmit = async e =>{
        e.preventDefault();
        const newImage = await dispatch(imageEvents.createNewImage({userId:sessionUser.id, albumId:id, imageUrl,content}));
        return newImage;
    }

    return(
        <div>
            <h1>Let's upload some images!</h1>
            <form onSubmit={handleSubmit}>
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
        </div>
    )
}

export default UploadImagesForm;
