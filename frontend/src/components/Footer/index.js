import { NavLink } from "react-router-dom";
import './index.css';

const Footer = () =>{
return(
    <div><footer className="footer"><span><NavLink to={'/about-me'}>About Me</NavLink></span><span><NavLink to ='/jobs'>Jobs</NavLink></span><span><NavLink to='/blog'>Blog</NavLink></span><span><NavLink to='/developers'>Developers</NavLink></span><span><NavLink to='/guidelines'>Guidelines</NavLink></span><span><NavLink to='/privacy'>Privacy</NavLink></span><span><NavLink to='/terms'>Terms</NavLink></span><span><NavLink to='/help'>Help</NavLink></span><span><NavLink to='/language'>English</NavLink></span></footer></div>
)
};

export default Footer;
