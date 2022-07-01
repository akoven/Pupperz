import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Homepage from './components/Homepage';
import AlbumsPage from './components/AlbumsPage';
import Navigation from './components/Navigation';
import CreateAlbumForm from './components/CreateAlbumForm';
import EditAlbumForm from './components/CreateAlbumForm/EditAlbumForm';
import ImagesPage from './components/ImagesPage';
import AllUserImages from './components/ImagesPage/AllUserImages';
import EditImageForm from './components/ImagesPage/EditImageForm';
import * as sessionActions from './store/session';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() =>{
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  },[dispatch]);

  return (
    // for logged-in try /logged-in/:userId
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path='/logged-in/:userId'>
            <Homepage />
          </Route>
          <Route path='/user/:userId/albums'>
            <AlbumsPage />
          </Route>
          <Route path='/user/:userId/all-images'>
            <AllUserImages />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/create-album/:userId'>
            <CreateAlbumForm />
          </Route>
          <Route path='/edit-album/:albumId'>
            <EditAlbumForm />
          </Route>
          <Route path='/albums/:albumId/images'>
            <ImagesPage />
          </Route>
          <Route path='/edit-image/:albumId/:imageId'>
            <EditImageForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
