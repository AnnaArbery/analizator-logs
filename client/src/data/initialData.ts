export const logsList = [
  { label: 'Серверные логи', value: 'server' },
  { label: 'fail2ban', value: 'fail2ban' },
  { label: 'xray', value: 'xray' },
];

const fieldsLogsServer = [
  'ip',
  'dash',
  'dash1',
  'date',
  'zone',
  'method',
  'url',
  'http',
  'status',
  'size',
  'refers',
  'agent',
];

export const initLogSettings = {
  server: {
    title: 'Серверные логи',
    fields: ['site', ...fieldsLogsServer],
    file: 'ts40.ru-access_log.log',
    columns: 'columnsTitlesServerLog.json',
  },
  fail2ban: {
    title: 'fail2ban',
    fields: [
      'data1',
      'data2',
      'af',
      'pid',
      'type',
      'sshd',
      'action',
      'ip',
      't',
      'data3',
      'data4',
    ],
    file: 'fail2ban-logs.log',
    columns: 'columnsTitlesServerLog.json',
  },
  xray: {
    title: 'xray',
    fields: [
      'data1',
      'data2',
      'data3',
      'server',
      'process',
      'data4',
      'data5',
      'from',
      'ip',
      'accepted',
      'url',
      't1',
      't2',
      't3',
      'mm',
      'user',
    ],
    file: 'logsxray-zomro.txt',
    columns: 'columnsTitlesServerLog.json',
  },
};

export type logTypes = keyof typeof initLogSettings;
