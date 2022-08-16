import React, {useContext} from "react";
import {userContext} from '../../context/userContext';
import { useNavigate } from "react-router-dom";
import {auth} from '../../firebase';
import {signOut} from "firebase/auth";
import Nav from '../Nav';
import logoutlogo from '../../assets/logout-24.ico';

const Header = () => {

  const {setLogged, logged, setLoggedUserName, setLoggedUid} = useContext(userContext);
  const navigate = useNavigate();

  const logOut = async() => {
    await signOut(auth);
    setLogged(false);
    setLoggedUserName('');
    setLoggedUid('');
    navigate('/');
  };

  return <header>
          <div>
            <h1 className="page-title">React WPHeadless</h1>
            {logged ? <button onClick={logOut} className="logout"><img src={logoutlogo} alt="logout"></img></button> : <></>}
          </div>
          <Nav/>
        </header>;
};

export default Header;
