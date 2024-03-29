import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import {configureStore} from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import sessionReducer from "./session";
import albumReducer from "./album";
import imageReducer from "./image";
import allImagesReducer from "./userImage";
import favoritesReducer from "./favorite";
import commentReducer from "./comment";

const rootReducer = combineReducers({
  session: sessionReducer,
  albums: albumReducer,
  images: imageReducer,
  userImages: allImagesReducer,
  favorites: favoritesReducer,
  comments: commentReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
