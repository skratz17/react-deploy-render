import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Input from './input/Input';

const Form = props => {
  const { formConfig, onChange, onSubmit } = props;

  // for forms that can be pre-populated, we need to first manually trigger validation... this will run validation on any untouched field in a form when its data changes (an untouched change means the change is not coming from the user, but from some controlled data initially being set e.g. inital values for a field being populated by values of an object loaded from database)
  useEffect(() => {
    const validiationChanges = Object.keys(formConfig)
      .filter(fieldName => !formConfig[fieldName].isTouched && formConfig[fieldName].isValid !== validate(fieldName, formConfig[fieldName].value))
      .map(fieldName => ({
        name: fieldName,
        value: formConfig[fieldName].value,
        isValid: validate(fieldName, formConfig[fieldName].value)
      }));
    if(validiationChanges.length) {
      validiationChanges.forEach(onChange);
    }
  }, [ formConfig ]);

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

    if(validation.mustMatch) {
      if(value !== formConfig[validation.mustMatch].value) return false;
    }

    if(validation.mustBeLessThan) {
      if(isNaN(value) || isNaN(formConfig[validation.mustBeLessThan].value) || parseFloat(value) >= parseFloat(formConfig[validation.mustBeLessThan].value)) return false;
    }

    if(validation.mustBeGreaterThan) {
      if(isNaN(value) || isNaN(formConfig[validation.mustBeGreaterThan].value) || parseFloat(value) <= parseFloat(formConfig[validation.mustBeGreaterThan].value)) return false;
    }
    
    return true;
  };

  const formConfigArray = Object.keys(formConfig)
    .map(fieldName => ({ name: fieldName, ...formConfig[fieldName] }));

  return (
    <form className="form" onSubmit={handleSubmit}>
      { formConfigArray.map(inputConfig => {
        const { name, label, inputType, elementConfig, value, isTouched, isValid, items } = inputConfig;
        return <Input key={name}
          label={label}
          inputType={inputType}
          elementConfig={elementConfig}
          value={value}
          items={items}
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