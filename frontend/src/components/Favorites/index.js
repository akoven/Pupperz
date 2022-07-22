import { NavLink, useParams } from "react-router-dom";
import { useSelector} from "react-redux";
import { useEffect } from "react";

const Favorites = () =>{

    const userId = useParams();
    const sessionUser = useSelector(state => state.session.user);

    return(
      <NavLink to={`/logged-in/${userId}`}>{'<< Back to Home'}</NavLink>
    );
}

export default Favorites;
