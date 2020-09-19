import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';

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
    <h1 className="siteName">uhhh wut</h1>
  </header>
);

export default injectIntl(Header);