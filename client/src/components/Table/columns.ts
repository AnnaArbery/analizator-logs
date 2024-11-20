import type { TableColumnsType } from 'antd';
import logServerType from '../../types/logServerType';

const columns: TableColumnsType<logServerType> = [
  {
    title: 'IP',
    key: 'ip',
    dataIndex: 'ip',
    width: 140,
  },
  {
    title: 'Время',
    dataIndex: 'date',
    key: 'date',
    width: 180,
    render: (date: number) =>
      `${new Intl.DateTimeFormat('ru-RU', {
        timeStyle: 'short',
        dateStyle: 'short',
      }).format(date)}`,
  },
  {
    title: 'Ссылка',
    dataIndex: 'url',
    key: 'url',
    // ellipsis: true,
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    width: 80,
    filters: [
      {
        text: '200',
        value: 200,
      },
      {
        text: '404',
        value: 404,
      },
      {
        text: '301',
        value: 301,
      },
      {
        text: 'Другие',
        value: 'Другие',
      },
    ],
    onFilter: (value, record) => {
      if (value === 'Другие') return ![200, 404, 301].includes(record.status);
      return record.status === value;
    },
  },
  {
    title: 'Размер, B',
    dataIndex: 'size',
    key: 'size',
    width: 100,
  },
  {
    title: 'Метод',
    dataIndex: 'method',
    key: 'method',
    width: 80,
    filters: [
      {
        text: 'GET',
        value: 'GET',
      },
      {
        text: 'POST',
        value: 'POST',
      },
    ],
    onFilter: (value, record) => record.method === value,
  },
  {
    title: 'Протокол',
    dataIndex: 'http',
    key: 'http',
    width: 100,
  },
  {
    title: 'Referers',
    dataIndex: 'refers',
    key: 'refers',
  },
  {
    title: 'User Agent',
    dataIndex: 'agent',
    key: 'agent',
    // ellipsis: true,
    filters: [
      {
        text: 'Googlebot',
        value: 'Googlebot',
      },
      {
        text: 'YandexBot',
        value: 'YandexBot',
      },
      {
        text: 'bingbot',
        value: 'bingbot',
      },
      {
        text: 'Боты',
        value: 'bot/',
      },
    ],
    // @ts-ignore
    onFilter: (value, record) => record.agent.includes(value),
  },
];
export default columns;
