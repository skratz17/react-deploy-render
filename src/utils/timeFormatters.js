/**
 * Given an amount of seconds, convert into string in M:SS format. If provided seconds value is not numeric, will just return the provided value back.
 * @param {any} seconds Amount of seconds to turn into M:SS formatted string. If isNaN, just returns seconds as passed in.
 */
export const convertSecondsToTimeString = seconds => {
  if(isNaN(seconds)) return seconds;
  seconds = parseInt(seconds);
  if(!seconds) return '0:00';

  const minutesPart = Math.floor(seconds / 60);
  let secondsPart = seconds % 60;
  if(secondsPart.toString().length === 1) secondsPart = '0' + secondsPart;

  return `${minutesPart}:${secondsPart}`;
};

/**
 * Given a time string, format it so that it will always be in the M:SS format. Does not care about if the returned time string represents a valid time, just that it is formatted to M:SS. If a string is supplied with more than two digits on the right side of a colon delimiter, will remove leading digits from right side of delimiter value until it is two digits in length, and will append the removed digits to the end of the value on the first side of the delimiter.
 * Examples: '' -> 0:00, '3:32' -> '3:32', ':52' -> '0:52', '3:324' -> '33:24'
 * @param {String} timeString A time string, possibly invalidly formatted, to format into M:SS.
 */
export const formatToMSSTimeString = timeString => {
  const timeStringParts = timeString.split(':');
  while(timeStringParts.length < 2) {
    timeStringParts.unshift('0');
  }

  if(timeStringParts[1].length > 2) {
    timeStringParts[0] += timeStringParts[1].substring(0, timeStringParts[1].length - 2);
    if(parseInt(timeStringParts[0]) === 0) timeStringParts[0] = '0';
    timeStringParts[1] = timeStringParts[1].substring(timeStringParts[1].length - 2);
  }
  else if(timeStringParts[1].length === 1 && timeStringParts[0]) {
    timeStringParts[1] = timeStringParts[0].charAt(timeStringParts[0].length - 1) + timeStringParts[1];
    timeStringParts[0] = timeStringParts[0].substring(0, timeStringParts[0].length - 1) || '0';
  }

  return timeStringParts.join(':');
};

/**
 * Given a time string of the format M:SS, convert to amount of seconds. If time string refers to an invalid time (e.g., seconds value >= 60) just return the time string as passed-in.
 * @param {String} timeString Time string of the format M:SS
 */
export const convertTimeStringToSeconds = timeString => {
  const timeStringParts = timeString.split(':');

  if(parseInt(timeStringParts[1]) >= 60) return timeString;

  return (60 * (parseInt(timeStringParts[0]) || 0)) + parseInt(timeStringParts[1]);
};