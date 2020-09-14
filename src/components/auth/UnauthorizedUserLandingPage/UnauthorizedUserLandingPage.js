import React from 'react';
import { LanguageProvider } from '../../language/LanguageProvider';

import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

const UnauthorizedUserLandingPage = props => (
  <div>
    <LoginForm {...props} />
    <LanguageProvider>
      <RegisterForm {...props} />
    </LanguageProvider>
  </div>
);

export default UnauthorizedUserLandingPage;