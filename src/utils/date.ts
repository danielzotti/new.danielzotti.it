export const toFormattedDate = (date: Date | string) => {
  if(typeof date === 'string') {
    date = new Date(date);
  }
  
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short', // '2-digit',
    year: 'numeric'
  });
};

export const toFormattedDateTime = (date: Date | string) => {
  if(typeof date === 'string') {
    date = new Date(date);
  }
  
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short', // '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
