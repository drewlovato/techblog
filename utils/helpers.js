module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  },
  format_datetime: (date) => {
    return new Date(date).toLocaleString();
  },
  trim_string: (value) => {
    return value.trim();
  },
};
