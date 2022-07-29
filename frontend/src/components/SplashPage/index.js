import './SplashPage.css';
import { Link, NavLink } from 'react-router-dom';
// import AboutMePage from '../AboutMePage';

const SplashPage = () =>{
    return(
        <div className="main-page">
            <div>
                <h1 className="welcome">Welcome to Pupperz!</h1>
                <div className="content"></div>
            </div>
            <footer className="footer"><span><NavLink to={'/about-me'}>About Me</NavLink></span><span><NavLink to ='/jobs'>Jobs</NavLink></span><span><NavLink to='/blog'>Blog</NavLink></span><span><NavLink to='/developers'>Developers</NavLink></span><span><NavLink to='/guidelines'>Guidelines</NavLink></span><span><NavLink to='/privacy'>Privacy</NavLink></span><span><NavLink to='/terms'>Terms</NavLink></span><span><NavLink to='/help'>Help</NavLink></span><span><NavLink to='/language'>English</NavLink></span></footer>
        </div>
    )
};

export default SplashPage;
