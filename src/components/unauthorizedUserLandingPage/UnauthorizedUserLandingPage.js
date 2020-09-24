import React from 'react';

import WelcomeBanner from './WelcomeBanner/WelcomeBanner';
import LoginAndRegister from '../auth/LoginAndRegister/LoginAndRegister';
import './UnauthorizedUserLandingPage.css';

const UnauthorizedUserLandingPage = props => <>
  <p style={{ padding: '1rem', backgroundColor: '#000', fontWeight: 'bold' }} className="text--warning">WARNING! This is not a secure application! Both the Login and Register forms' password fields are deactivated, and their value is always set to just the word "password". You do not need to worry about providing any sort of value in these fields!</p>
  <div className="unauthorizedUserLandingPage">
    <div className="col--left">  
      <WelcomeBanner />
      <div className="unauthorizedUserLandingPage__acronym">
        <p><span className="text--primary">U</span>nselfish</p>
        <p><span className="text--primary">H</span>umans</p>
        <p><span className="text--primary">H</span>elping</p>
        <p><span className="text--primary">H</span>umans</p>
        <p><span className="text--primary">W</span>ith</p>
        <p><span className="text--primary">U</span>nlimited</p>
        <p><span className="text--primary">T</span>ranscriptions</p>
      </div>
    </div>
    <div className="col--right">
      <LoginAndRegister {...props} />
    </div>
  </div> 
</>;

export default UnauthorizedUserLandingPage;