import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
import SplashPage from './components/SplashPage';
import SignupFormPage from './components/SignupFormPage';
import Homepage from './components/Homepage';
import AlbumsPage from './components/AlbumsPage';
import Navigation from './components/Navigation';
import CreateAlbumForm from './components/CreateAlbumForm';
import EditAlbumForm from './components/CreateAlbumForm/EditAlbumForm';
import ImagesPage from './components/ImagesPage';
import AllUserImages from './components/AllUserImages';
import EditImageForm from './components/ImagesPage/EditImageForm';
// import Favorites from './components/Favorites';
// import Footer from './components/Footer';
import AboutMePage from './components/AboutMePage';
import JobsPage from './components/JobsPage';
import BlogPage from './components/BlogPage';
import DevelopersPage from './components/DevelopersPage';
import GuidelinesPage from './components/GuidelinesPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import HelpPage from './components/HelpPage';
import LanguagePage from './components/LanguagePage';


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
      {/* <Footer /> */}
      {isLoaded && (
        <Switch>
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
          <Route path='/user/:userId/all-images'>
            <AllUserImages />
          </Route>
          <Route path='/edit-image/:albumId/:imageId'>
            <EditImageForm />
          </Route>
          {/* <Route path='/user/:userId/my-faves'>
            <Favorites />
          </Route> */}
          <Route path='/about-me' exact>
            <AboutMePage />
          </Route>
          <Route path='/jobs' exact>
            <JobsPage />
          </Route>
          <Route path='/blog' exact>
            <BlogPage />
          </Route>
          <Route path='/developers' exact>
            <DevelopersPage />
          </Route>
          <Route path='/guidelines' exact>
            <GuidelinesPage />
          </Route>
          <Route path='/privacy' exact>
            <PrivacyPage />
          </Route>
          <Route path='/terms' exact>
            <TermsPage />
          </Route>
          <Route path='/help' exact>
            <HelpPage />
          </Route>
          <Route path='/language' exact>
            <LanguagePage />
          </Route>
          <Route path="/" exact>
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
