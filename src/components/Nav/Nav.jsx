import React, {useContext} from "react";
import {Link} from 'react-router-dom';
import {userContext} from '../../context/userContext';


const Nav = () => {

  const {logged} = useContext(userContext);

  return <nav className="menu">
          <ul className="menu__box">
            <li><Link className="menu__item" to='/'>Posts</Link></li>
            <li><Link className="menu__item" to='/authors'>Authors</Link></li>
            {logged ? <li><Link className="menu__item" to='/favourites'>Favourites</Link></li> : <li><Link className="menu__item" to='/login'>Login</Link></li>}
          </ul> 
        </nav>;
};

export default Nav;
