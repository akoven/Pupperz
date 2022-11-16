import { csrfFetch } from "./csrf";

const READ = 'likesOnly/READ';

export const loadAllLikes = likes =>({
    type:READ,
    likes
});

export const seeLikes = (userId) => async dispatch =>{
    const response = await csrfFetch(`/api/likesOnly/${userId}`);
    if(response.ok){
        const imageLikes = await response.json();
        dispatch(loadAllLikes(imageLikes));
        return imageLikes;
    }
};

const likesOnlyReducer = (state={},action) =>{
    let newState;
    switch(action.type){
        case READ:
            newState = Object.assign({},state);
            action.likes.forEach(like => newState[like.id] = like);
            return newState;
        default:
            return state;
    }
};

export default likesOnlyReducer;
