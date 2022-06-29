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

// export const editImage = image =>({
//     type: EDIT,
//     image
// });

// export const deleteImageAction = image =>({
//     type: DELETE,
//     image
// });

export const createNewImage = (image) => async dispatch =>{
    const response = await csrfFetch(`/api/images`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(image)
    });

    if(response.ok){
        const newImage = await response.json();
        dispatch(createNewImage(newImage));
        return newImage;
    }
    return null;
};

// export const displayAllAlbums = () => async dispatch =>{
//     const response = await csrfFetch(`/api/images`);
//     if(response.ok){
//         const albums = await response.json();
//         dispatch(displayAlbums(albums));
//         // return albums;
//     }
//     return null;
// };

// export const getOneAlbum = (album) => async dispatch =>{
//     const response = await csrfFetch(`/api/albums/${album.id}`);
//     if(response.ok){
//         const album = await response.json();
//         dispatch(displayAlbums(album));
//     }
// }

// export const editAlbum = (album) => async dispatch =>{
//     const response = await csrfFetch(`/api/albums/${album.id}`,{
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(album)
//     });
//     if(response.ok){
//         const editedAlbum = await response.json();
//         dispatch(editAlbumAction(editedAlbum));
//         return editedAlbum;
//     }
// };

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
            newState = Object.assign({}, state);
            newState[action.album.id] = action.album;
            // console.log(newState);
            return newState;
        case READ:
            newState = Object.assign({}, state);
            action.albums.forEach(album => newState[album.id] = album)
            return newState;
        // case EDIT:

            // newState = Object.assign({},state);
            // newState[action.album.id] = action.album;
            // return newState;
        // case DELETE:
        //     newState = Object.assign({}, state);
        //     delete newState[action.album.id];
        //     return newState;

        default:
            return state;
    }
}

export default imageReducer;
