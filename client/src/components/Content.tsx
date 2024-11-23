import { ChangeEvent, useState } from 'react';
import { Table } from 'antd';
import logServerType from '../types/logServerType.ts';
import { Card, Button, TableColumnsType } from 'antd';
import DropDownFilter from './DropdownFilter.tsx';
import type { FilterDropdownProps } from 'antd/es/table/interface';

type ContentProps = {
  list: logServerType[];
  columnsTitlesTable: TableColumnsType<logServerType>;
};

type DataIndex = keyof logServerType;

const Content = ({ list, columnsTitlesTable }: ContentProps) => {
  const [countFilterd, setCountFiltered] = useState(0);
  const [filteredInfo, setFilteredInfo] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [count, setCount] = useState(50);
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
            setSelectedKeys={setSelectedKeys}
            onPressEnter={onOk}
            clear={clear}
            onOk={onOk}
          />
        </>
      );
    };

  // @ts-ignore
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('Table.tsx, filters', pagination, filters, sorter, extra);
    // console.log('Table.tsx, filters', filters);
    setCountFiltered(extra.currentDataSource.length);
    setFilteredInfo(filters);
  };

  const clearFilters = () => {
    setFilteredInfo({});
    setCountFiltered(0);
  };

  let columnsTitlesExtends: TableColumnsType<logServerType> = [
    {
      key: 'ip',
      filteredValue: filteredInfo.ip || null,
      onFilter: (value, record) =>
        record['ip']
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      filterDropdown: getColumnFilterDropdown('ip'),
    },
    {
      key: 'url',
      filteredValue: filteredInfo.url || null,
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
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => {
        if (value === 'Другие') return ![200, 404, 301].includes(record.status);
        return record.status === value;
      },
    },
    {
      key: 'method',
      filteredValue: filteredInfo.method || null,
      onFilter: (value, record) => record.method === value,
    },
    {
      key: 'size',
      sorter: (a, b) => a.size - b.size,
    },
    {
      key: 'agent',
      filteredValue: filteredInfo.agent || null,
      onFilter: (value, record: logServerType) => {
        value = value.toString().toLowerCase();
        if (value[0] === '!')
          return !record.agent.toLowerCase().includes(value.slice(1));
        return record.agent.toLowerCase().includes(value as string);
      },
      filterDropdown: getColumnFilterDropdown('agent'),
    },
  ];

  columnsTitlesExtends.forEach((item) => {
    let idxInitCol = columns.findIndex((col) => col.key === item.key);
    columns[idxInitCol] = { ...columns[idxInitCol], ...item };
  });
  columns = [...columns];

  return (
    <div className='content'>
      <div className='grid'>
        <div className='tableSettings'>
          <Card bordered={false}>
            <div className='tableCount' style={{ marginRight: 'auto' }}>
              {countFilterd !== 0 && countFilterd !== list.length && (
                <>Выбрано {countFilterd} из </>
              )}
              {(countFilterd === 0 || countFilterd === list.length) && (
                <>Всего строк </>
              )}
              {list.length}
            </div>

            <Button type='primary' onClick={clearFilters}>
              Сброс фильтров
            </Button>
          </Card>
        </div>

        <Table<logServerType>
          dataSource={list}
          columns={columns}
          pagination={{
            pageSizeOptions: ['30', '50', '100'],
            pageSize: count,
            onChange: (page, pageSize) => setCount(pageSize),
          }}
          scroll={{ y: 55 * 12 }}
          bordered
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Content;
