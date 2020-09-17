import React from 'react';

import logo from '../../assets/logo.png';
import './Header.css';

const Header = () => (
  <header className="header">
    <img className="logo" src={logo} alt="Uhhh Wut Logo" />
    <h1 className="siteName">uhhh wut</h1>
  </header>
);

export default Header;