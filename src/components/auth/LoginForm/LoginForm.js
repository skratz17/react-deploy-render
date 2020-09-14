import React, { useState } from 'react';

import Form from '../../form/Form';
import loginFormConfig from './loginFormConfig';

const LoginForm = () => {
  const [ formConfig, setFormConfig ] = useState(loginFormConfig);
  const [ didLoginFail, setDidLoginFail ] = useState(false);

  const handleLoginSubmit = () => {

  };
};

export default LoginForm;