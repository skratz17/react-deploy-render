import React from 'react';

import { formatToMSSTimeString, convertTimeStringToSeconds, convertSecondsToTimeString } from '../../../utils/timeFormatters';

const VALID_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Delete', 'Backspace', 'Tab', 'Down', 'ArrowDown', 'Up', 'ArrowUp', 'Left', 'ArrowLeft', 'Right', 'ArrowRight', 'Esc', 'Escape', 'Fn', 'Control', 'NumLock', 'Shift'];

const TimeInput = props => {
  const { onChange, value } = props;

  const handleKeyDown = e => {
    if(!VALID_KEYS.includes(e.key)) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleChange = e => {
    const timeString = formatToMSSTimeString(e.target.value);
    e.target.value = convertTimeStringToSeconds(timeString);
    onChange(e);
  };

  return (
    <input {...props}
      type="text"
      value={convertSecondsToTimeString(value)}
      onKeyDown={handleKeyDown}
      onChange={handleChange} />
  );
};

export default TimeInput;