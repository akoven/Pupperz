import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

const EditComment = () =>{
    const {userId, imageId, commentId} = useParams();
    const image = useSelector(state => state.userImages[imageId]);
    const comment = useSelector(state => state.comments[commentId]);

    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState(comment.comment);

    return(
        <div>
            <h3>Edit Comment</h3>
            <img className='edit=comment-pg' src={image.imageUrl} alt={'image here'}/>
            <form>
                <textarea
                type="text"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder='500 characters or less'
                rows='10'
                style={{width: "450px"}}
                />
                <button>Submit</button>
                <button onClick={() => history.push(`/comments/${userId}/${imageId}`)}>Cancel</button>
            </form>
        </div>
    )
}

export default EditComment;
