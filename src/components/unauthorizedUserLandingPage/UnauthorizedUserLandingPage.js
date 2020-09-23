import React from 'react';

import WelcomeBanner from './WelcomeBanner/WelcomeBanner';
import LoginAndRegister from '../auth/LoginAndRegister/LoginAndRegister';
import './UnauthorizedUserLandingPage.css';

const UnauthorizedUserLandingPage = props => <>
  <div className="unauthorizedUserLandingPageHeader">
    <h1 className="unauthorizedUserLandingPageHeader__siteName">UHHHWUT</h1>
    <i className="material-icons">question_answer</i>
  </div>
  <div className="unauthorizedUserLandingPage">
    <WelcomeBanner />
    <LoginAndRegister {...props} />
  </div>
</>;

export default UnauthorizedUserLandingPage;