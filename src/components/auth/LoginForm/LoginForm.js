import React, { useContext, useState } from 'react';

import { UserContext } from '../../user/UserProvider';
import Form from '../../form/Form';
import { useFormConfig, useIsFormValid } from '../../form/formCustomHooks';
import loginFormConfig from './loginFormConfig';

const LoginForm = props => {
  const [ didLoginFail, setDidLoginFail ] = useState(false);

  const [ formConfig, handleFormChange ] = useFormConfig(loginFormConfig);
  const isFormValid = useIsFormValid(formConfig);

  const { getUserByEmail } = useContext(UserContext);

  const handleChange = changeData => {
    setDidLoginFail(false);
    handleFormChange(changeData);
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
      <h2>Login</h2>
      { didLoginFail && <p className="text--warning">A user with the supplied credentials was not found. Please try again.</p> }
      <Form formConfig={formConfig} onChange={handleChange} onSubmit={handleLoginSubmit}>
        <button disabled={!isFormValid} type="submit">Log In</button>
      </Form>
    </div>
  );
};

export default LoginForm;