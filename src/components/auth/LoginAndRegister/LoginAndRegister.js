import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import './LoginAndRegister.css';

const LoginAndRegister = props => {
  const [ isLoginMode, setIsLoginMode ] = useState(true);

  return (
    <div className={`loginAndRegister ${isLoginMode ? 'loginMode' : 'registerMode'}`}>
      <div className="loginFormWrapper">
        { isLoginMode && <LoginForm {...props} /> }
      </div>

      <button className={`loginAndRegister__loginModeToggleButton btn ${isLoginMode ? 'btn--create' : 'btn--neutral'}`} onClick={() => setIsLoginMode(!isLoginMode)}>
        { isLoginMode ? 
          <FormattedMessage id="loginAndRegister.createAccountButton"
            defaultMessage="Create Account" /> : 
          <FormattedMessage id="loginAndRegister.backToLoginButton"
            defaultMessage="Back to Login" />
        }
      </button>
      
      <div className="registerFormWrapper">
        { !isLoginMode && <RegisterForm {...props} /> }
      </div>
    </div>
  );
};

export default LoginAndRegister;