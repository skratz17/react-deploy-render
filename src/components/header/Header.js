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
    <div className="logo">
      <Link className="header__homeLink" to="/">
        <i className="material-icons">question_answer</i>
        <h1 className="siteName">
          uhhh wut
        </h1>
      </Link>
    </div>
    <NavBar />
  </header>
);

export default injectIntl(Header);