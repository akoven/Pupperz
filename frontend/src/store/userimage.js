import { csrfFetch } from "./csrf";

const READ_ALL = 'userimage/READ_ALL';
const CREATE = 'userimage/CREATE';

export const uploadUserImage = image =>{
    return{
        type: CREATE,
        image
    }
}

export const displayAllImagesAction = images =>({
        type: READ_ALL,
        images
});

export const displayAllImagesUserPage = (userId) => async dispatch =>{
    console.log('made it to displayAllImagesUserPage thunk');
    const response = await csrfFetch(`/api/userimages/${userId}`);
    console.log(response);
    if(response.ok){
        const images = await response.json();
        console.log('images from thunk ',images);
        dispatch(displayAllImagesAction(images));
        return images;
    }
    return null;
};

export const createNewImageOnly = (image) => async dispatch =>{
    const response = await csrfFetch(`/api/userimages/`, {
        method: 'POST',
        body: JSON.stringify(image)
    });

    if(response.ok){
        const newImage = await response.json();
        dispatch(uploadUserImage(newImage))
    }
};

const initialState = {};

const userImageReducer = (state = initialState, action) =>{
    let newState;
    switch(action.type){
        case CREATE:
            newState = Object.assign({},state);
            newState[action.image.id] = action.image;
            return newState;
         case READ_ALL:
            newState = Object.assign({},state);
            action.images.forEach(userImage => newState[userImage.id] = userImage);
            console.log('made it to the imageReducer');
            console.log(newState);
            return newState;
    }
}
