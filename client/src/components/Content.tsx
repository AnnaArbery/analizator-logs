import { ChangeEvent } from 'react';
import Table from './Table/Table.tsx';
import logServerType from '../types/logServerType.ts';
import { Card, Button, TableColumnsType } from 'antd';
import DropDownFilter from './Table/DropDownFilter.tsx';
import type { FilterDropdownProps } from 'antd/es/table/interface';

type ContentProps = {
  list: logServerType[];
  columnsTitlesTable: TableColumnsType<logServerType>;
};

type DataIndex = keyof logServerType;

const Content = ({ list, columnsTitlesTable }: ContentProps) => {
  let columns = columnsTitlesTable;

  const getColumnFilterDropdown =
    (dataIndex: DataIndex) => (props: FilterDropdownProps) => {
      const { setSelectedKeys, selectedKeys, confirm, clearFilters, filters } =
        props;

      const clear = () => {
        setSelectedKeys([]);
        clearFilters?.();
      };

      const onOk = () => confirm();

      return (
        <>
          <DropDownFilter
            dataIndex={dataIndex}
            selectedKeys={selectedKeys}
            filters={filters}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={onOk}
            // onChangeCheckbox={(checkedValues: string[]) => setSelectedKeys(checkedValues)}
            clear={clear}
            onOk={onOk}
          />
        </>
      );
    };

  const columnsTitlesExtends: TableColumnsType<logServerType> = [
    {
      key: 'ip',
      onFilter: (value, record) =>
        record['ip']
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      filterDropdown: getColumnFilterDropdown('ip'),
    },
    {
      key: 'url',
      onFilter: (value, record) =>
        record['url']
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      filterDropdown: getColumnFilterDropdown('url'),
    },
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
      key: 'size',
      sorter: (a, b) => a.size - b.size,
    },
    {
      dataIndex: 'agent',
      key: 'agent',
      onFilter: (value, record: logServerType) => {
        value = value.toString();
        console.log(value);
        if (value[0] === '!') return !record.agent.includes(value.slice(1));
        return record.agent.includes(value as string);
      },
    },
  ];

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
