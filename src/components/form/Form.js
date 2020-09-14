import React from 'react';
import PropTypes from 'prop-types';

import Input from './input/Input';

const Form = props => {
  const { formConfig, onSubmit } = props;

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleChange = e => {
    console.log(e.target.value);
  };

  const formConfigArray = Object.keys(formConfig)
    .map(fieldName => ({ name: fieldName, ...formConfig[fieldName] }));

  return (
    <form className="form" onSubmit={handleSubmit}>
      { formConfigArray.map(inputConfig => {
        const { name, inputType, elementConfig, value, onChange, isTouched, isValid } = inputConfig;
        return <Input inputType={inputType}
          elementConfig={elementConfig}
          value={value}
          onChange={handleChange}
          isTouched={isTouched}
          isValid={isValid} />;
      })}
    </form>
  );
};

Form.propTypes = {
  formConfig: PropTypes.object,
  onSubmit: PropTypes.func
};

export default Form;