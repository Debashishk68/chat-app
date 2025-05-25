function convertToTime(value, options = {}) {
  const date = new Date(value);

  if (isNaN(date)) {
    return 'Invalid time';
  }

  // Default formatting: 12-hour with AM/PM
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    ...options
  });
}
export default convertToTime;