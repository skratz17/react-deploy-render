import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Select from '../select/Select';
import './Input.css';
import TimeInput from '../timeInput/TimeInput';

const Input = props => {
  const { name, inputType, isTouched, isValid, label, elementConfig, value, onChange, items, formId } = props;
  const className = (isTouched && !isValid) ? 'invalid' : '';
  debugger;

  let placeholderText = '';
  if(elementConfig.placeholder) {
    placeholderText = props.intl.formatMessage({ id: `${formId}.${name}Placeholder`}) || '';
  }

  let labelText = '';
  if(label) {
    labelText = props.intl.formatMessage({ id: `${formId}.${name}Label`}) || label;
  }

  let inputElement;
  switch(inputType) {
    case 'input':
      inputElement = <input {...elementConfig} 
        name={name}
        placeholder={placeholderText}
        value={value}
        className={className}
        onChange={onChange} 
        />;
      break;
    case 'textarea':
      inputElement = <textarea {...elementConfig} 
        name={name}
        placeholder={placeholderText}
        value={value}
        className={className}
        onChange={onChange} />;
      break;
    case 'select':
      inputElement = <Select {...elementConfig} 
        name={name}
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        className={className}
        items={items} />;
      break;
    case 'time':
      inputElement = <TimeInput {...elementConfig} 
        name={name}
        value={value}
        onChange={onChange}
        className={className} />;
      break;
    default:
      throw new Error('You must provide a valid inputType.');
  }

  return (
    <fieldset className="formGroup">
      {label && <label className="formGroup__label">{labelText}</label>}
      { inputElement }
    </fieldset>
  );
}; 

Input.propTypes = {
  inputType: PropTypes.oneOf([ 'input', 'select', 'textarea', 'time' ]),
  name: PropTypes.string,
  formId: PropTypes.string,
  isTouched: PropTypes.bool,
  isValid: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  items: PropTypes.array,
  elementConfig: PropTypes.object 
};

export default injectIntl(Input);