import React from "react";
import Nav from '../Nav';
import logoQuodem from '../../assets/logo-quodem-color.png';

const Header = () => {

  return <header>
          <div className="logo-container">
            <img src={logoQuodem} alt="logo-quodem" />
            <span className="space"></span>
            <h1 className="page-title"> - React WPHeadless</h1>
          </div>
          <Nav/>
        </header>;
};

export default Header;
