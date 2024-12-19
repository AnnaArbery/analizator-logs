export const normalizeValue = (value, option) => {
  let result;
  result = value.replace(/\"|\]|\[/gi, '');

  const operation = {
    date: (value) => {
      const [day, month, year, hour, min, sec] = value.split(/\/|:/);
      return +new Date(`${month} ${day}, ${year} ${hour}:${min}:${sec}`);
    },
    status: (value) => Number(value),
    '-': () => '',
    'url-xray': (value) => {
      const [, url] = value.split(':');
      return url;
    },
    'ip-xray': (value) => {
      const [ip] = value.split(':');
      return ip;
    },
    'process-xray': (value) => {
      return value.replace(/\d+|:/gi, '');
    },
  };

  return operation[option]?.(result) || result;
};
