import React from 'react';

import WelcomeBanner from './WelcomeBanner/WelcomeBanner';
import LoginAndRegister from '../auth/LoginAndRegister/LoginAndRegister';

const UnauthorizedUserLandingPage = props => (
  <div>
    <WelcomeBanner />
    <LoginAndRegister {...props} />
  </div>
);

export default UnauthorizedUserLandingPage;