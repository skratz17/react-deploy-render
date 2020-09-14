import React, { useState } from 'react';

import Form from '../../form/Form';
import { useFormConfig, useIsFormValid } from '../../form/formCustomHooks';
import registerFormConfig from './registerFormConfig';

const RegisterForm = props => {
  const [ formConfig, handleFormChange ] = useFormConfig(registerFormConfig);
  const isFormValid = useIsFormValid(formConfig);

  const handleSubmit = () => {
  };

  return (
    <div className="registerFormWrapper">
      <h2>Register</h2>
      <Form formConfig={formConfig} onChange={handleFormChange} onSubmit={handleSubmit}>
        <button disabled={!isFormValid} type="submit">Register</button>
      </Form>
    </div>
  );
};

export default RegisterForm;