import React, { useState } from 'react';

import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import './LoginAndRegister.css';

const LoginAndRegister = props => {
  const [ isLoginMode, setIsLoginMode ] = useState(true);

  return (
    <div className="loginAndRegister">
      { isLoginMode && <LoginForm {...props} /> }
      <button className={`loginAndRegister__loginModeToggleButton btn ${isLoginMode ? 'btn--create' : 'btn--back'}`} onClick={() => setIsLoginMode(!isLoginMode)}>
        { isLoginMode ? 'Create Account' : 'Back to Login' }
      </button>
      { !isLoginMode && <RegisterForm {...props} /> }
    </div>
  );
};

export default LoginAndRegister;