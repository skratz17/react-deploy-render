import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import NavBar from '../navbar/NavBar';
import './Header.css';

defineMessages({
  logoTitle: {
    id: 'header.logoTitle',
    defaultMessage: 'Unselfish Humans Helping Humans With Unlimited Transcriptions'
  }
});

const Header = props => (
  <header className="header">
    <div className="logo" title={props.intl.formatMessage({ id: 'header.logoTitle' })}>
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