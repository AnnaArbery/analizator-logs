// import { Table } from 'antd';

import { useEffect, useState } from 'react';
import Table from './Table/Table.tsx';
// import columns from './Table/columns.ts';
import logServerType from '../types/logServerType.ts';
import { Card, Button } from 'antd';
// import { Select, Input, Segmented, Space } from 'antd';
import type { TableColumnsType } from 'antd';

type ContentProps = {
  list: logServerType[];
  columnsTitlesTable: TableColumnsType<logServerType>;
};

// const options = [
//   {
//     value: 'IP',
//     label: 'IP',
//   },
//   {
//     value: 'Ссылка',
//     label: 'Ссылка',
//   },
//   {
//     value: 'User agent',
//     label: 'User agent',
//   },
// ];

const columnsTitlesExtends: TableColumnsType<logServerType> = [
  {
    key: 'date',
    render: (date: number) =>
      `${new Intl.DateTimeFormat('ru-RU', {
        timeStyle: 'short',
        dateStyle: 'short',
      }).format(date)}`,
  },
  {
    key: 'status',
    onFilter: (value, record) => {
      if (value === 'Другие') return ![200, 404, 301].includes(record.status);
      return record.status === value;
    },
  },
  {
    key: 'method',
    onFilter: (value, record) => record.method === value,
  },
  {
    dataIndex: 'agent',
    key: 'agent',
    onFilter: (value: any, record: logServerType) =>
      record.agent.includes(value),
  },
];

const Content = ({ list, columnsTitlesTable }: ContentProps) => {
  const [data, setData] = useState(list);
  let columns = columnsTitlesTable;

  useEffect(() => {
    setData(list);
  }, [list]);

  columnsTitlesExtends.forEach((item) => {
    let idxInitCol = columns.findIndex((col) => col.key === item.key);
    columns[idxInitCol] = { ...columns[idxInitCol], ...item };
  });

  return (
    <div className='content'>
      <div className='grid'>
        <Card bordered={false} style={{ marginBottom: '20px' }}>
          {/*
          Статусы:&nbsp;
          <Segmented
            options={['Все', '200', '404', '301']}
            onChange={(value) => {
              console.log(value); // string
            }}
          />
          {<Select
            placeholder='Статусы'
            variant='filled'
            style={{ flex: 1 }}
            defaultValue=''
            options={[
              { value: '', label: 'Все' },
              { value: '200', label: '200' },
              { value: '404', label: '404' },
              { value: '301', label: '301' },
            ]}
          />}
          <br />
          Методы:&nbsp;
          <Segmented
            options={['Все', 'GET', 'POST']}
            onChange={(value) => {
              console.log(value); // string
            }}
          />
          <Select
            placeholder='Методы'
            variant='filled'
            style={{ flex: 1 }}
            defaultValue=''
            options={[
              { value: '', label: 'Все' },
              { value: 'GET', label: 'GET' },
              { value: 'POST', label: 'POST' },
            ]}
          /> 
          <br />
          <Space.Compact>
            <Select
              defaultValue=''
              options={options}
              style={{ minWidth: '100px' }}
            />
            <Input defaultValue='' />
          </Space.Compact>
          IP:
          <Input placeholder='IP' variant='filled' />
          <br />
          */}
          <Button
            type='primary'
            onClick={() => setData((prev) => prev.slice(0, 55))}
          >
            Фильтровать
          </Button>
        </Card>
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
};

export default Content;
