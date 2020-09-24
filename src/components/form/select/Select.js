import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const Select = props => {
  const { items, placeholder } = props;

  return (
    <select {...props}>
      <option value="" disabled>{placeholder}</option>
      { items.map(i => <option key={i.value} value={i.value}>{i.displayName}</option>) }
    </select>
  );
};

Select.propTypes = {
  placeholder: PropTypes.string,
  items: PropTypes.array
};

export default injectIntl(Select);