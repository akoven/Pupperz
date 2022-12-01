import { csrfFetch } from "./csrf";

const CREATE = 'comment/CREATE';
const READ  = 'comment/READ';
const EDIT = 'comment/EDIT';
const DELETE = 'comment/DELETE';

export const submitNewComment = comment =>({
    type: CREATE,
    comment
});

export const seeAllComments = comments =>({
    type: READ,
    comments
});

export const editComment = comment =>({
    type: EDIT,
    comment
});

export const deleteComment = comment =>({
    type: DELETE,
    comment
});

export const submitComment = (content,userId,imageId) => async dispatch =>{
    const response = await csrfFetch(`/api/comments/${userId}/${imageId}`, {
        method: 'POST',
        body: JSON.stringify(content)
    });

    if(response.ok){
        const newComment = await response.json();
        dispatch(submitNewComment(newComment));
        return newComment;
    };
    return null;
};

export const getComments = (imageId) => async dispatch =>{
    const response = await csrfFetch(`/api/comments/${imageId}`);
    if(response.ok){
        const comments = await response.json();
        dispatch(seeAllComments(comments));
        return comments;
    };
    return null
};


const commentReducer = (state = {}, action) =>{
    let newState;
    switch(action.type){
        case CREATE:
            newState = Object.assign({}, state);
            newState[action.comment.id] = action.comment;
            return newState;
        case READ:
            newState = {};
            action.comments.forEach(comment => newState[comment.id] = comment);
            return newState;
        default:
            return state;
    };
};


export default commentReducer;
