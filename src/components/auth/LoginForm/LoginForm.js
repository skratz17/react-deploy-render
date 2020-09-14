import React, { useContext, useState } from 'react';

import { UserContext } from '../../user/UserProvider';
import Form from '../../form/Form';
import loginFormConfig from './loginFormConfig';

const LoginForm = props => {
  const [ formConfig, setFormConfig ] = useState(loginFormConfig);
  const [ didLoginFail, setDidLoginFail ] = useState(false);

  const { getUserByEmail } = useContext(UserContext);

  const handleChange = changeData => {
    const { name, value, isValid, isTouched } = changeData;

    const updatedFormConfig = { ...formConfig };
    const updatedFormElement = { 
      ...updatedFormConfig[name], 
      value,
      isValid,
      isTouched
    };
    updatedFormConfig[name] = updatedFormElement;

    setFormConfig(updatedFormConfig);
  };

  const handleLoginSubmit = async () => {
    const user = await getUserByEmail(formConfig.email.value);
    if(user && user.password === formConfig.password.value) {
      localStorage.setItem('current_user', user.id);
      props.history.push('/');
    }
    else {
      alert('A user with those credentials was not found.');
    }
  };

  return (
    <Form formConfig={formConfig} onChange={handleChange} onSubmit={handleLoginSubmit}>
      <button type="submit">Log In</button>
    </Form>
  );
};

export default LoginForm;