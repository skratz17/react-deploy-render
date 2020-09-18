import React from 'react';

import { convertTimeStringToSeconds, convertSecondsToTimeString } from '../../../utils/timeFormatters';

const TimeInput = props => {
  const { onChange, value } = props;

  const handleChange = e => {
    e.target.value = convertTimeStringToSeconds(e.target.value);
    onChange(e);
  };

  return (
    <input {...props}
      type="text"
      value={convertSecondsToTimeString(value)}
      onChange={handleChange} />
  );
};

export default TimeInput;