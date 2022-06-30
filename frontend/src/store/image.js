import { csrfFetch } from "./csrf";

const CREATE = 'image/CREATE';
const READ = 'image/READ';
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

export const editImageAction = image =>({
    type: EDIT,
    image
});

// export const deleteImageAction = image =>({
//     type: DELETE,
//     image
// });

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

export const displayAllImages = () => async dispatch =>{
    const response = await csrfFetch(`/api/images`);
    if(response.ok){
        const images = await response.json();
        dispatch(displayImages(images));
        return images;
    }
    return null;
};


export const editImage = (image) => async dispatch =>{
    const response = await csrfFetch(`/api/images/${image.id}`,{
        method: 'PUT',
        body: JSON.stringify(image)
    });
    if(response.ok){
        const editedImage = await response.json();
        dispatch(editImageAction(editedImage));
        return editedImage;
    }
};

// export const deleteAlbum = (album) => async dispatch =>{
//     const response = await csrfFetch(`/api/albums/${album.id}`,{
//         method: 'DELETE'
//     });
//     dispatch(deleteAlbumAction(album));
//     return response;
// };

const initialState = {};

const imageReducer = (state = initialState, action) =>{
    let newState;
    switch(action.type){
        case CREATE:
            newState = {};
            newState[action.image.id] = action.image;
            // console.log(newState);
            return newState;
        case READ:
            newState = Object.assign({}, state);
            action.images.forEach(image => newState[image.id] = image)
            return newState;
        case EDIT:
            newState = Object.assign({},state);
            newState[action.image.id] = action.image;
            return newState;
        // case DELETE:
        //     newState = Object.assign({}, state);
        //     delete newState[action.album.id];
        //     return newState;

        default:
            return state;
    }
}

export default imageReducer;
