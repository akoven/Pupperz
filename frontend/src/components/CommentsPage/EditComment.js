import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editCommentThunk } from "../../store/comment";
import './editComment.css';

const EditComment = () =>{
    const {userId, imageId, commentId} = useParams();
    const image = useSelector(state => state.userImages[imageId]);
    const comment = useSelector(state => state.comments[commentId]);

    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState(comment.comment);

    useEffect(() => {
        console.log(comment)
    },[dispatch])

    const handleEdit = async(e) =>{
        e.preventDefault();
        const payload={
            id: comment.id,
            userId: +userId,
            userImageId: +imageId,
            comment: content
        };

        const editedComment = await dispatch(editCommentThunk(payload));
        if(editedComment){
            alert('comment updated!');
            history.push(`/comments/${userId}/${imageId}`);
        }
    };

    return(
        <div>
            <h3>Edit Comment</h3>
            <img className='edit=comment-pg' src={image.imageUrl} alt={'image here'}/>
            <form onSubmit={handleEdit}>
                <textarea
                type="text"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder='500 characters or less'
                rows='5'
                style={{width: "300px"}}
                />
                <button type="submit">Submit</button>
                <button onClick={() => history.push(`/comments/${userId}/${imageId}`)}>Cancel</button>
            </form>
        </div>
    )
}

export default EditComment;
