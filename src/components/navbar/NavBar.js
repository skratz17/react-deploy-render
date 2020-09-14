import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './NavBar.css';

const NavBar = props => {
  const location = useLocation();

  const linksConfig = [
    { text: 'Workshop', to: '/workshop' },
    { text: 'Dashboard', to: '/dashboard' },
    { text: 'Logout', to: '/logout' }
  ];

  return (
    <nav className="navBar">
      <ul className="navBar__links">
        { linksConfig.map(l => (
          <li className={`navBar__linksListItem ${l.to === location.pathname ? 'current' : ''}`}>
            <Link className="navBar__link" to={l.to}>{l.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;