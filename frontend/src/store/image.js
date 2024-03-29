import { csrfFetch } from "./csrf";

const CREATE = 'image/CREATE';
const READ = 'image/READ';
const READ_ALL = 'image/READ_ALL';
const EDIT = 'image/EDIT';
const DELETE = 'image/DELETE';

export const uploadImage = image =>({
    type: CREATE,
    image
});

export const displayImages = images =>({
    type: READ,
    images
});

// export const displayAllImagesAction = images =>({
//     type: READ_ALL,
//     images
// });

export const editImageAction = image =>({
    type: EDIT,
    image
});

export const deleteImageAction = image =>({
    type: DELETE,
    image
});

export const createNewImage = (image) => async dispatch =>{
    const response = await csrfFetch(`/api/images`, {
        method:'POST',
        body: JSON.stringify(image)
    });

    if(response.ok){
        const newImage = await response.json();
        dispatch(uploadImage(newImage));
        return newImage;
    }
    return null;
};

// export const createNewImageOnly = (image) => async dispatch =>{
//     const response = await csrfFetch(`/api/images/`, {
//         method: 'POST',
//         body: JSON.stringify(image)
//     });

//     if(response.ok){
//         const newImage = await response.json();
//         dispatch(uploadImage(newImage))
//     }
// }

export const displayAllImages = (albumId) => async dispatch =>{
    const response = await csrfFetch(`/api/images/${albumId}`);
    // console.log(response);
    if(response.ok){
        const images = await response.json();
        dispatch(displayImages(images));
        return images;
    }
    return null;
};

// export const displayAllImagesUserPage = (userId) => async dispatch =>{
//     console.log('made it to displayAllImagesUserPage thunk');
//     const response = await csrfFetch(`/api/images/${userId}`);
//     console.log(response);
//     if(response.ok){
//         const images = await response.json();
//         console.log('images from thunk ',images);
//         dispatch(displayAllImagesAction(images));
//         return images;
//     }
//     return null;
// }

export const editImage = (image) => async dispatch =>{
    const response = await csrfFetch(`/api/images/${image.id}`,{
        method: 'PUT',
        body: JSON.stringify(image)
    });
    if(response.ok){
        const editedImage = await response.json();
        // console.log('editedImage ',editedImage);
        dispatch(editImageAction(editedImage));
        return editedImage;
    }
};

export const deleteImage = (image) => async dispatch =>{
    // console.log('made it to thunk for deleteImage');
    // console.log('image object passed into thunk: ', image);
    // console.log('image Id ', image.id);
    const response = await csrfFetch(`/api/images/${image.id}`,{
        method: 'DELETE'
    });
    // console.log('deleteImageAction not reached');
    dispatch(deleteImageAction(image));
    // console.log('deleteImageAction reached');
    return response;
};

const initialState = {};

const imageReducer = (state = initialState, action) =>{
    let newState;
    switch(action.type){
        case CREATE:
            newState = Object.assign({},state);
            newState[action.image.id] = action.image;
            // console.log(newState);
            return newState;
        case READ:
            // newState = Object.assign({}, state);
            newState = {};
            action.images.forEach(albumImage => newState[albumImage.id] = albumImage);
            return newState;
        // case READ_ALL:
        //     newState = Object.assign({},state);
        //     action.images.forEach(userImage => newState[userImage.id] = userImage);
        //     console.log('made it to the imageReducer');
        //     console.log(newState);
        //     return newState;
        case EDIT:
            newState = Object.assign({},state);
            newState[action.image.id] = action.image;
            return newState;
        case DELETE:
            newState = Object.assign({}, state);
            delete newState[action.image.id];
            return newState;

        default:
            return state;
    }
}

export default imageReducer;
