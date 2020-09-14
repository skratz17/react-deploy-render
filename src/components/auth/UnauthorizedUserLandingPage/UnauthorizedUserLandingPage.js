import React from 'react';

import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

const UnauthorizedUserLandingPage = props => (
  <div>
    <LoginForm {...props} />
    <RegisterForm {...props} />
  </div>
);

export default UnauthorizedUserLandingPage;