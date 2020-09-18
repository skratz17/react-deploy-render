import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './NavBar.css';

const NavBar = props => {
  const location = useLocation();

  const linksConfig = [
    { text: <FormattedMessage id="navBar.workshopLink" defaultMessage="Workshop" />, to: '/workshop' },
    { text: <FormattedMessage id="navBar.dashboardLink" defaultMessage="Dashboard" />, to: '/dashboard' },
    { text: <FormattedMessage id="navBar.logoutLink" defaultMessage="Logout" />, to: '/logout' }
  ];

  return (
    <nav className="navBar">
      <ul className="navBar__links">
        { linksConfig.map(l => (
          <li key={l.to} className={`navBar__linksListItem ${l.to === location.pathname ? 'current' : ''}`}>
            <Link className="navBar__link" to={l.to}>
              {l.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;