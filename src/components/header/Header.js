import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import NavBar from '../navbar/NavBar';
import logo from '../../assets/logo.png';
import './Header.css';

defineMessages({
  logoAltText: {
    id: 'header.logoAltText',
    defaultMessage: 'Uhhh Wut Logo'
  }
});

const Header = props => (
  <header className="header">
    <img className="logo" src={logo} alt={props.intl.formatMessage({ id: 'header.logoAltText' })} />
    <h1 className="siteName">
      <Link className="siteName__link" to="/">uhhh wut</Link>
    </h1>
    <NavBar />
  </header>
);

export default injectIntl(Header);