import { csrfFetch } from "./csrf";

const CREATE = 'favorite/CREATE';
export const createFolder = payload =>({
    type: CREATE,
    payload
});

const READ ='favorite/READ';
export const loadFavoritesFolder = images =>({
    type: READ,
    images
})

export const createFavoritesFolder = payload => async dispatch =>{
    const response = await csrfFetch(`/api/favorites`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if(response.ok){
        const newFolder = await response.json();
        dispatch(createFolder(newFolder));
        return newFolder
    }
    return null;
};

export const loadFavorites = () => async dispatch =>{
    const response = await csrfFetch('/api/favorites');
    if(response.ok){
        const folder = await response.json();
        dispatch(loadFavoritesFolder(folder));
        return folder;
    }
}

const favoritesReducer = (state = {},action)=>{
    let newState;
    switch(action.type){
        case CREATE:
            newState = Object.assign({},state);
            newState[action.payload.id] = action.payload;
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
