import React, {useState, useEffect} from 'react';
import { Modal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCommentThunk } from '../../store/comment';

const CommentModal = ({userId, imageId, comment}) =>{
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    // const comment = comments.find(comments.id == userId)

    const openMenu = () =>{
        if(showModal) return;
        setShowModal(true);
    };
    useEffect(() => {
        console.log(imageId)
        // console.log(comment)
    },[])
    // useEffect(() => {
    //     if(!showModal) return;
    //     const closeMenu = () =>{
    //         setShowModal(false)
    //     }
    //     document.addEventListener('click', closeMenu);
    //     return () => document.removeEventListener("click", closeMenu)
    // }, [showModal]);

    return(
        <>
            <button onClick={openMenu}><i class="fa-solid fa-pen" /></button>
            {showModal && (
                <div>
                    <button onClick={() => setShowModal(false)}>X</button>
                    <div onClick={() => history.push(`/comments/edit/${userId}/${imageId}/${comment.id}`)}>Edit</div>
                    <div onClick={() => dispatch(deleteCommentThunk(comment))}>Delete</div>
                    {/* <div onClick={() => alert(comment)}>Delete</div> */}
                </div>
            )}

        </>
    )
}

export default CommentModal;
