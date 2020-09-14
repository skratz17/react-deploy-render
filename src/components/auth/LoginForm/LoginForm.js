import React, { useContext, useState } from 'react';

import { UserContext } from '../../user/UserProvider';
import Form from '../../form/Form';
import { useIsFormValid } from '../../form/formCustomHooks';
import loginFormConfig from './loginFormConfig';

const LoginForm = props => {
  const [ formConfig, setFormConfig ] = useState(loginFormConfig);
  const [ didLoginFail, setDidLoginFail ] = useState(false);

  const isFormValid = useIsFormValid(formConfig);

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

    setDidLoginFail(false);
    setFormConfig(updatedFormConfig);
  };

  const handleLoginSubmit = async () => {
    const user = await getUserByEmail(formConfig.email.value);
    if(user && user.password === formConfig.password.value) {
      localStorage.setItem('current_user', user.id);
      props.history.push('/');
    }
    else {
      setDidLoginFail(true);
    }
  };

  return (
    <div className="loginFormWrapper">
      { didLoginFail && <p className="text--warning">A user with the supplied credentials was not found. Please try again.</p> }
      <Form formConfig={formConfig} onChange={handleChange} onSubmit={handleLoginSubmit}>
        <button disabled={!isFormValid} type="submit">Log In</button>
      </Form>
    </div>
  );
};

export default LoginForm;