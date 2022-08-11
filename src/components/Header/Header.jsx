import React, {useContext} from "react";
import {userContext} from '../../context/userContext';
import Nav from '../Nav';

const Header = () => {

  const {setLogged, logged} = useContext(userContext);

  const logOut = () => {
    setLogged(false);
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
