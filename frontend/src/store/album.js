const CREATE = 'album/CREATE';
const READ = 'album/READ';
const EDIT = 'album/EDIT';
const DELETE = 'album/DELETE';

export const createNewAlbum = album =>({
    type: CREATE,
    album
});

export const createAlbum = (album) => async dispatch =>{
    const response = await fetch(`/api/albums`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(album)
    });

    if(response.ok){
        const newAlbum = await response.json();
        dispatch(createNewAlbum(newAlbum));
        return newAlbum;
    }
    return null;
}

const initialState = {};

const albumReducer = (state = initialState, action) =>{
    let newState;
    switch(action.type){
        case CREATE:
            newState = Object.assign({}, state);
            newState[action.album.id] = action.album;
            console.log(newState);
            return newState;
        default:
            return state;
    }
}

export default albumReducer;