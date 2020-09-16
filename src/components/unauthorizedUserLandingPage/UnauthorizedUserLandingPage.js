import React from 'react';

import WelcomeBanner from './WelcomeBanner/WelcomeBanner';
import LoginAndRegister from '../auth/LoginAndRegister/LoginAndRegister';
import './UnauthorizedUserLandingPage.css';

const UnauthorizedUserLandingPage = props => (
  <div className="unauthorizedUserLandingPage">
    <WelcomeBanner />
    <LoginAndRegister {...props} />
  </div>
);

export default UnauthorizedUserLandingPage;