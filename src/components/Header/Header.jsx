import React, {useContext} from "react";
import {userContext} from '../../context/userContext';
import { useNavigate } from "react-router-dom";
import Nav from '../Nav';

const Header = () => {

  const {setLogged, logged} = useContext(userContext);
  const navigate = useNavigate();

  const logOut = () => {
    setLogged(false);
    navigate('/');
  };

  return <header>
          <div>
            <h1 className="page-title">React WPHeadless</h1>
            {logged ? <button onClick={logOut}>Logout</button> : <></>}
          </div>
          <Nav/>
        </header>;
};

export default Header;
