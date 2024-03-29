import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import CommentModal from "./CommentModal";
import * as commentEvents from "../../store/comment";
import './index.css';

const CommentsPage = () => {

    const {imageId, userId} = useParams();
    const userSession = useSelector(state => state.session.user);
    const imageIdNum = +imageId;
    const imageArr = useSelector(state => state.userImages);
    const images = Object.values(imageArr || {});
    const comments = useSelector(state => state.comments);
    const commentsArr = Object.values(comments || {});
    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState('');

    const selectedImg = images.find(image => image.id === imageIdNum);

    useEffect(() =>{
        // console.log('images: ', imageArr[imageIdNum])
        // console.log(selectedImg);
        // console.log('image id type',typeof(imageId))
        // console.log('user id type',typeof(userId))
        // console.log('current user id: ', userId);
        dispatch(commentEvents.getComments(imageId));
    },[dispatch, imageId, userId]);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const payload ={
            userId: +userId,
            userImageId: +imageId,
            comment: content
        };
        const newComment = await dispatch(commentEvents.submitComment(payload));
        if(newComment){
            alert('new comment posted!');
            history.push(`/comments/${userId}/${imageId}`)
        }
    };

    return(
        <div className="comments-pg">
            <h3>Comments Page</h3>
            <img className='selected-img-for-comment' src={selectedImg.imageUrl} alt='image here'/>
            <form onSubmit={handleSubmit}>
                <textarea
                type="text"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder='50 characters or less'
                rows='5'
                style={{width: "300px"}}
                />
                {content.length}/50 characters used
                <button type="submit" className="comment-submit" disabled={content.length > 50}>Submit</button>
                <button className="comment-cancel" onClick={() => history.push(`/logged-in/${userId}`)}>Cancel</button>
            </form>
            {commentsArr.map(comment => <div className="user-comment">{userSession.username} says: <div>{comment.comment} {comment.userId == userId ? <CommentModal userId={userId} imageId={imageId} comment={comment}/>:null}</div></div>)}

        </div>
    )
}

export default CommentsPage;
