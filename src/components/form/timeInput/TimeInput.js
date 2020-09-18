import React from 'react';

const TimeInput = props => {
  const { onChange, value } = props;

  const convertSecondsToTimeString = seconds => {
    if(seconds.toString().includes(':')) return seconds;
    seconds = parseInt(seconds);
    if(!seconds) return '0:00';

    const minutesPart = Math.floor(seconds / 60);
    let secondsPart = seconds % 60;
    if(secondsPart.toString().length === 1) secondsPart = '0' + secondsPart;

    return `${minutesPart}:${secondsPart}`;
  };

  const convertTimeStringToSeconds = timeString => {
    const timeStringParts = timeString.split(':');
    while(timeStringParts.length < 2) {
      timeStringParts.unshift('0');
    }

    if(timeStringParts[1].length > 2) {
      timeStringParts[0] += timeStringParts[1].substring(0, timeStringParts[1].length - 2);
      timeStringParts[1] = timeStringParts[1].substring(timeStringParts[1].length - 2);
    }
    else if(timeStringParts[1].length === 1 && timeStringParts[0]) {
      timeStringParts[1] = timeStringParts[0].charAt(timeStringParts[0].length - 1) + timeStringParts[1];
      timeStringParts[0] = timeStringParts[0].substring(0, timeStringParts[0].length - 1);
    }

    if(parseInt(timeStringParts[1]) >= 60) return timeStringParts.join(':');

    return (60 * (parseInt(timeStringParts[0]) || 0)) + parseInt(timeStringParts[1]);
  };

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