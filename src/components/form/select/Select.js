import React from 'react';
import PropTypes from 'prop-types';

const Select = props => {
  const { placeholder, items } = props;

  return (
    <select {...props}>
      <option value="" disabled>{placeholder}</option>
      { items.map(i => <option key={i.value} value={i.value}>{i.displayName}</option>) }
    </select>
  );
};

Select.propTypes = {
  items: PropTypes.array,
  placeholder: PropTypes.string
};

export default Select;