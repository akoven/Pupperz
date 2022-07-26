import { csrfFetch } from "./csrf";

const CREATE = 'userImage/CREATE';
const READ = 'userImage/READ';
const READ_ALL = 'userImage/READ_ALL';
const DELETE = 'userImage/DELETE';

export const uploadUserImage = image =>({
    type: CREATE,
    image
});

export const displayAllImagesAction = images =>({
    type: READ,
    images
});

export const displayAllUsersImages = images => ({
    type: READ_ALL,
    images
});

export const deleteUserImageAction = image =>({
    type: DELETE,
    image
});

export const createNewImageOnly = (image) => async dispatch =>{
    const response = await csrfFetch(`/api/userImages`, {
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
        console.log('images from images page thunk ',images);
        dispatch(displayAllImagesAction(images));
        return images;
    }
    return null;
};

export const displayAllImagesHomePage = () => async dispatch =>{
    console.log('made it to displayAllImagesUserPage thunk');
    const response = await csrfFetch(`/api/userImages`);
    console.log(response);
    if(response.ok){
        const images = await response.json();
        console.log('images from homepage thunk ',images);
        dispatch(displayAllUsersImages(images));
        return images;
    }
    return null;
};
export const deleteUserImage = (image) => async dispatch =>{
    const response = await csrfFetch(`/api/userImages/${image.id}`,{
        method: 'DELETE'
    });
    dispatch(deleteUserImageAction(image));
    return response;
}
const initialState = {};

const allImagesReducer = (state = initialState,action) =>{
    let newState;
    switch(action.type){
        case CREATE:
            newState = Object.assign({}, state);
            newState[action.image.id] = action.image;
            return newState;
        case READ:
            newState = {};
            action.images.forEach(userImage => newState[userImage.id] = userImage);
            console.log('made it to the imageReducer');
            console.log(newState);
            return newState;
        case READ_ALL:
            newState = {};
            action.images.forEach(userImage => newState[userImage.id] = userImage);
            console.log('made it to read_all imageReducer');
            console.log(newState);
            return newState;
        case DELETE:
            newState = Object.assign({},state);
            delete newState[action.image.id];
            return newState;
        default:
            return state;
    }
}

export default allImagesReducer;
