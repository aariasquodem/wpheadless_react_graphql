import React, {useContext} from "react";
import {Link} from 'react-router-dom';
import {userContext} from '../../context/userContext';
import {auth} from '../../firebase';
import {signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Nav = () => {

  const {setLogged, logged, setLoggedUserName, setLoggedUid} = useContext(userContext);

  const navigate = useNavigate();

  const logOut = async() => {
    await signOut(auth);
    setLogged(false);
    setLoggedUserName('');
    setLoggedUid('');
    navigate('/');
  };

  return <nav className="menu">
          <ul className="menu__box">
            <li><Link className="menu__item" to='/'>Posts</Link></li>
            <li><Link className="menu__item" to='/authors'>Authors</Link></li>
            {logged ? <li><Link className="menu__item" to='/favourites'>Favourites</Link></li> : <li><Link className="menu__item" to='/login'>Login</Link></li>}
            {logged ? <li className="logout-li" onClick={logOut}><button className="logout"></button></li> : <></>}
          </ul> 
        </nav>;
};

export default Nav;
