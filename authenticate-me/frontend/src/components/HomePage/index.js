import './Homepage.css';
import { NavLink } from 'react-router-dom';

const HomePage = () =>{
    return(
        <div>
            <NavLink to='/signup'><button>Sign Up!</button></NavLink>
            <NavLink to='/login'><button>Log In</button></NavLink>
        </div>
    )
}

export default HomePage;
