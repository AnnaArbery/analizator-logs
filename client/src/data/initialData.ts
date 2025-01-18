export const logsList = [
  { label: 'Серверные', value: 'server' },
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
    title: 'Серверные',
    fields: ['site', ...fieldsLogsServer],
    file: 'site-access_log.json',
    columns: 'columnsTitlesServerLog.json',
  },
  fail2ban: {
    title: 'fail2ban',
    fields: [
      'date',
      'date1',
      'af',
      'pid',
      'type',
      'sshd',
      'action',
      'ip',
      't',
      'date2',
      'date3',
    ],
    file: 'fail2ban-logs.json',
    columns: 'columnsTitlesServerLog.json',
  },
  xray: {
    title: 'xray',
    fields: [
      'date',
      'date1',
      'date2',
      'server',
      'process',
      'date3',
      'date4',
      'from',
      'ip',
      'accepted',
      'url',
      'txt',
      't2',
      't3',
      'mm',
      'user',
    ],
    file: 'xray-log.json',
    columns: 'columnsTitlesServerLog.json',
  },
};

export type logTypes = keyof typeof initLogSettings;
