import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { UserContext } from '../../user/UserProvider';
import Form from '../../form/Form';
import { useFormConfig, useIsFormValid } from '../../form/formCustomHooks';
import loginFormConfig, { FORM_ID } from './loginFormConfig';
import './LoginForm.css';

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

  return <>
    <div className="loginForm">
      { didLoginFail && 
        <p className="loginForm__invalidCredentialsWarning text--warning">
          <FormattedMessage id="loginForm.invalidCredentialsWarning"
            defaultMessage="A user with the supplied credentials was not found. Please try again." />
        </p> 
      }
      <Form id={FORM_ID} formConfig={formConfig} onChange={handleChange} onSubmit={handleLoginSubmit}>
        <button disabled={!isFormValid} type="submit" className="loginForm__loginButton btn btn--action">
          <FormattedMessage id="loginForm.logInButton" defaultMessage="Log In" />
        </button>
      </Form>
    </div>
    <div className="line line--75"></div>
  </>;
};

export default LoginForm;