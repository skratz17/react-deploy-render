import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const Select = props => {
  const { items, formId } = props;

  return (
    <select {...props}>
      <option value="" disabled>{props.intl.formatMessage({ id: `${formId}.${props.name}Placeholder`})}</option>
      { items.map(i => <option key={i.value} value={i.value}>{i.displayName}</option>) }
    </select>
  );
};

Select.propTypes = {
  formId: PropTypes.string,
  items: PropTypes.array
};

export default injectIntl(Select);