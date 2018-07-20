import React from 'react';
import Logo from '../../images/Logo.png';
import MenuIcon from '../../images/menu-icon.png';
import '../../styles/components/navbar.css';

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="main-color-border"></div>
      <div className="nav-content">
        <img src={MenuIcon} alt="" id="menu-icon"/>
        <div className="logo">
          <img src={Logo} className="logo-image" />
          ockfolio
        </div>
      </div>
      <div id="market-hours">
        Market Open
      </div>
    </div>
  );
}

export default NavBar;