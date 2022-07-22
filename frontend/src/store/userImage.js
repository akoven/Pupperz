import { csrfFetch } from "./csrf";

const CREATE = 'userImage/CREATE';
const READ_ALL = 'userImage/READ_ALL';

export const uploadUserImage = image =>({
    type: CREATE,
    image
});

export const displayAllImagesAction = images =>({
    type: READ_ALL,
    images
});

export const createNewImageOnly = (image) => async dispatch =>{
    const response = await csrfFetch(`/api/userImages/`, {
        method: 'POST',
        body: JSON.stringify(image)
    });

    if(response.ok){
        const newImage = await response.json();
        dispatch(uploadUserImage(newImage))
    }
};

export const displayAllImagesUserPage = (userId) => async dispatch =>{
    console.log('made it to displayAllImagesUserPage thunk');
    const response = await csrfFetch(`/api/userImages/${userId}`);
    console.log(response);
    if(response.ok){
        const images = await response.json();
        console.log('images from thunk ',images);
        dispatch(displayAllImagesAction(images));
        return images;
    }
    return null;
};

const initialState = {};

const allImagesReducer = (state = initialState,action) =>{
    let newState;
    switch(action.type){
        case CREATE:
            newState = Object.assign({}, state);
            newState[action.image.id] = action.image;
            return newState;
        case READ_ALL:
            newState = Object.assign({},state);
            action.images.forEach(userImage => newState[userImage.id] = userImage);
            console.log('made it to the imageReducer');
            console.log(newState);
            return newState;
        default:
            return state;
    }
}

export default allImagesReducer;
