function formatDate(date) {
  const inputDate = new Date(date);

  if (isNaN(inputDate.getTime())) {
    return 'Invalid Date';
  }

  const today = new Date();
  const yesterday = new Date();

  today.setHours(0, 0, 0, 0);
  yesterday.setDate(today.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  if (inputDate.getTime() === today.getTime()) {
    return "Today";
  } else if (inputDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return inputDate.toISOString().split('T')[0]; // safe now
  }
}


export default formatDate;