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
  let columns = columnsTitlesTable;

  columnsTitlesExtends.forEach((item) => {
    let idxInitCol = columns.findIndex((col) => col.key === item.key);
    columns[idxInitCol] = { ...columns[idxInitCol], ...item };
  });

  return (
    <div className='content'>
      <div className='grid'>
        <Card
          bordered={false}
          style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            type='primary'
            // onClick={() => setData((prev) => prev.slice(0, 55))}
          >
            Фильтровать
          </Button>
        </Card>
        <Table data={list} columns={columns} />
      </div>
    </div>
  );
};

export default Content;
