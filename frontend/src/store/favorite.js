import { csrfFetch } from "./csrf";

const CREATE = 'favorite/CREATE';
export const uploadLiked = image =>({
    type: CREATE,
    image
});

const READ ='favorite/READ';
export const loadAllLikedImages = images =>({
    type: READ,
    images
})

export const createLikedImage = image => async dispatch =>{
    const response = await csrfFetch(`/api/favorites`, {
        method: 'POST',
        body: JSON.stringify(image)
    });

    if(response.ok){
        const newFave = await response.json();
        dispatch(uploadLiked(newFave));
        return newFave
    }
    return null;
};

export const loadAllLiked = () => async dispatch =>{
    const response = await csrfFetch('/api/favorites');
    if(response.ok){
        const images = await response.json();
        dispatch(loadAllLikedImages(images));
        return images;
    }
}

const favoritesReducer = (state = {},action)=>{
    let newState;
    switch(action.type){
        case CREATE:
            newState = Object.assign({},state);
            newState[action.image.id] = action.image;
            return newState;
        case READ:
            newState = Object.assign({},state);
            action.images.forEach(image => newState[image.id] = image);
            return newState;
        default:
            return state
    }
}

export default favoritesReducer;
