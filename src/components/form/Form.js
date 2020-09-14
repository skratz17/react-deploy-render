import React from 'react';
import PropTypes from 'prop-types';

import Input from './input/Input';

const Form = props => {
  const { formConfig, onChange, onSubmit } = props;

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleChange = e => {
    const isValid = validate(e.target.name, e.target.value);
    onChange({
      name: e.target.name,
      value: e.target.value,
      isTouched: true,
      isValid
    });
  };

  const validate = (field, value) => {
    const { validation } = formConfig[field] || {};

    if(validation.isRequired) {
      if(!value.trim()) return false;
    }
    
    return true;
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
      { props.children }
    </form>
  );
};

Form.propTypes = {
  formConfig: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default Form;