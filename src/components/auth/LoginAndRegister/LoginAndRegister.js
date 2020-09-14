import React, { useState } from 'react';

import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

const LoginAndRegister = props => {
  const [ isLoginMode, setIsLoginMode ] = useState(true);

  return (
    <div className="loginAndRegisterWrapper">
      { isLoginMode && <LoginForm {...props} /> }
      <button onClick={() => setIsLoginMode(!isLoginMode)}>
        { isLoginMode ? 'Create Account' : 'Back to Login' }
      </button>
      { !isLoginMode && <RegisterForm {...props} /> }
    </div>
  );
};

export default LoginAndRegister;