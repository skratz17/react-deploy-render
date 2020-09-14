import React from 'react';

import LoginForm from '../LoginForm/LoginForm';

const UnauthorizedUserLandingPage = props => (
  <div>
    <LoginForm {...props} />
  </div>
);

export default UnauthorizedUserLandingPage;