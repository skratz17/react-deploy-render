import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { UserContext } from '../../user/UserProvider';
import { LanguageContext } from '../../language/LanguageProvider';
import Form from '../../form/Form';
import { useFormConfig, useIsFormValid } from '../../form/formCustomHooks';
import registerFormConfig from './registerFormConfig';
import './RegisterForm.css';

const RegisterForm = props => {
  const [ didRegisterFail, setDidRegisterFail ] = useState(false);

  const [ formConfig, handleFormChange, updateFormConfig ] = useFormConfig(registerFormConfig);
  const isFormValid = useIsFormValid(formConfig);

  const { getUserByEmail, saveUser } = useContext(UserContext);
  const { getLanguages, languages } = useContext(LanguageContext);

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    if(languages.length && !formConfig.nativeLanguageId.items.length) {
      const items = languages.map(l => ({ value: l.id, displayName: l.name }));
      updateFormConfig('nativeLanguageId', items, 'items');
    }
  }, [ languages, formConfig, updateFormConfig ]);

  const handleChange = changeData => {
    setDidRegisterFail(false);
    handleFormChange(changeData);
  }

  const handleSubmit = async () => {
    const user = await getUserByEmail(formConfig.email.value);
    if(user) {
      setDidRegisterFail(true);
    }
    else {
      const newUserData = {
        firstName: formConfig.firstName.value,
        lastName: formConfig.lastName.value,
        email: formConfig.email.value,
        password: formConfig.password.value,
        nativeLanguageId: parseInt(formConfig.nativeLanguageId.value)
      };

      const newUser = await saveUser(newUserData);
      localStorage.setItem('current_user', newUser.id);
      props.history.push('/');
    }
  };

  return <>
    <div className="line line--75"></div>
    <div className="registerForm">
      { didRegisterFail && 
        <p className="registerForm__duplicateEmailWarning text--warning">
          <FormattedMessage id="registerForm.duplicateEmailWarning"
            defaultMessage="A user with that email already exists. Please provide a different email address." />
        </p> 
      }
      <Form formConfig={formConfig} onChange={handleChange} onSubmit={handleSubmit}>
        <button className="registerForm__registerButton btn btn--create" disabled={!isFormValid} type="submit">
          <FormattedMessage id="registerForm.registerButton" defaultMessage="Register" />
        </button>
      </Form>
    </div>
  </>;
};

export default RegisterForm;