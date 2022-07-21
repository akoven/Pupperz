import { csrfFetch } from "./csrf";

const CREATE = 'album/CREATE';
const READ = 'album/READ';
const EDIT = 'album/EDIT';
const DELETE = 'album/DELETE';


export const createNewAlbum = album =>({
    type: CREATE,
    album
});

export const displayAlbums = albums =>({
    type: READ,
    albums,
});

export const editAlbumAction = album =>({
    type: EDIT,
    album
});

export const deleteAlbumAction = album =>({
    type: DELETE,
    album
});

export const createAlbum = (album,userId) => async dispatch =>{
    const response = await csrfFetch(`/api/albums/${userId}`, {
        method:'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify(album)
    });

    if(response.ok){
        const newAlbum = await response.json();
        dispatch(createNewAlbum(newAlbum));
        return newAlbum;
    }
    return null;
};

export const displayAllAlbums = (userId) => async dispatch =>{
    const response = await csrfFetch(`/api/albums/${userId}`);
    if(response.ok){
        const albums = await response.json();
        dispatch(displayAlbums(albums));
        // return albums;
    }
    return null;
};

// export const getOneAlbum = (album) => async dispatch =>{
//     const response = await csrfFetch(`/api/albums/${album.id}`);
//     if(response.ok){
//         const album = await response.json();
//         dispatch(displayAlbums(album));
//     }
// }

export const editAlbum = (album) => async dispatch =>{
    const response = await csrfFetch(`/api/albums/${album.id}`,{
        method: 'PUT',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify(album)
    });
    if(response.ok){
        const editedAlbum = await response.json();
        dispatch(editAlbumAction(editedAlbum));
        return editedAlbum;
    }
};

export const deleteAlbum = (album) => async dispatch =>{
    const response = await csrfFetch(`/api/albums/${album.id}`,{
        method: 'DELETE'
    });
    dispatch(deleteAlbumAction(album));
    return response;
};

const initialState = {};

const albumReducer = (state = initialState, action) =>{
    let newState;
    switch(action.type){
        case CREATE:
            newState = Object.assign({}, state);
            newState[action.album.id] = action.album;
            // console.log(newState);
            return newState;
        case READ:
            // newState = Object.assign({}, state);
            newState = {};
            action.albums.forEach(album => newState[album.id] = album);
            return newState;
        case EDIT:
            newState = Object.assign({},state);
            newState[action.album.id] = action.album;
            return newState;
        case DELETE:
            newState = Object.assign({}, state);
            delete newState[action.album.id];
            return newState;

        default:
            return state;
    }
}

export default albumReducer;
