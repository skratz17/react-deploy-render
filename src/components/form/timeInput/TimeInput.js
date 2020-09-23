import React from 'react';

import { formatToMSSTimeString, convertTimeStringToSeconds, convertSecondsToTimeString } from '../../../utils/timeFormatters';

const TimeInput = props => {
  const { onChange, value } = props;

  const handleChange = e => {
    const timeString = formatToMSSTimeString(e.target.value);
    e.target.value = convertTimeStringToSeconds(timeString);
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