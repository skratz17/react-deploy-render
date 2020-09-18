import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './NavBar.css';

const NavBar = props => {
  const location = useLocation();

  const linksConfig = [
    { text: 'Workshop', id: 'workshopLink', to: '/workshop' },
    { text: 'Dashboard', id: 'dashboardLink', to: '/dashboard' },
    { text: 'Logout', id: 'logoutLink', to: '/logout' }
  ];

  return (
    <nav className="navBar">
      <ul className="navBar__links">
        { linksConfig.map(l => (
          <li key={l.to} className={`navBar__linksListItem ${l.to === location.pathname ? 'current' : ''}`}>
            <Link className="navBar__link" to={l.to}>
              <FormattedMessage id={`navBar.${l.id}`}
                defaultMessage={l.text} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;