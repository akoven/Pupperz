import React, {useState, useEffect} from 'react';
// import { Modal } from '../../context/Modal';
import './index.css';
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
                <div className='modalWindow'>
                    <button onClick={() => setShowModal(false)} className='close-menu'>x</button>
                    <div><button className='comment-edit-btn' onClick={() => history.push(`/comments/edit/${userId}/${imageId}/${comment.id}`)}>Edit</button></div>
                    <div><button className='comment-delete-btn' onClick={() => dispatch(deleteCommentThunk(comment))}>Delete</button></div>
                    {/* <div onClick={() => alert(comment)}>Delete</div> */}
                </div>
            )}

        </>
    )
}

export default CommentModal;
