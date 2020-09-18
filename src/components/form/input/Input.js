import React from 'react';
import PropTypes from 'prop-types';

import Select from '../select/Select';
import './Input.css';
import TimeInput from '../timeInput/TimeInput';

const Input = props => {
  const { inputType, isTouched, isValid, label, elementConfig, value, onChange, items } = props;
  const className = (isTouched && !isValid) ? 'invalid' : '';

  let inputElement;
  switch(inputType) {
    case 'input':
      inputElement = <input {...elementConfig}
        value={value}
        className={className}
        onChange={onChange} />;
      break;
    case 'textarea':
      inputElement = <textarea {...elementConfig}
        value={value}
        className={className}
        onChange={onChange} />;
      break;
    case 'select':
      inputElement = <Select {...elementConfig}
        value={value}
        onChange={onChange}
        className={className}
        items={items} />;
      break;
    case 'time':
      inputElement = <TimeInput {...elementConfig}
        value={value}
        onChange={onChange}
        className={className} />;
      break;
    default:
      throw new Error('You must provide a valid inputType.');
  }

  return (
    <fieldset className="formGroup">
      {label && <label className="formGroup__label">{label}</label>}
      { inputElement }
    </fieldset>
  );
}; 

Input.propTypes = {
  inputType: PropTypes.oneOf([ 'input', 'select', 'textarea' ]),
  isTouched: PropTypes.bool,
  isValid: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  items: PropTypes.array,
  elementConfig: PropTypes.object 
};

export default Input;