import { csrfFetch } from "./csrf";

const CREATE = 'favorite/CREATE';
export const createFaveImg = payload =>({
    type: CREATE,
    payload
});

const READ ='favorite/READ';
export const loadFavoritesFolder = images =>({
    type: READ,
    images
})

export const addFavoriteImage = (payload) => async dispatch =>{
    console.log('PAYLOAD FROM FRONTEND: ',payload)
    const response = await csrfFetch(`/api/favorites`, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    console.log("RESPONSE FROM ADDFAVIMG: ",response)

    if(response.ok){
        const newImage = await response.json();
        dispatch(createFaveImg(newImage));
        return newImage
    }
    return null;
};

export const loadFavorites = (userId) => async dispatch =>{
    const response = await csrfFetch(`/api/favorites/${userId}`);
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
