import { useState } from 'react';
import DropDownFilter from '../components/DropdownFilter.tsx';
import logServerType from '../types/logServerType.ts';
import { TableColumnsType } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';

type DataIndex = keyof logServerType;
type FilteredInfo = { [key: string]: string[] };

const getColumnFilterDropdown =
  (dataIndex: DataIndex) => (props: FilterDropdownProps) => {
    const { selectedKeys, setSelectedKeys, confirm, filters, clearFilters } =
      props;

    const clear = () => {
      setSelectedKeys([]);
      clearFilters?.();
    };

    const onOk = () => confirm();

    return DropDownFilter({
      dataIndex,
      selectedKeys,
      filters,
      setSelectedKeys,
      onPressEnter: onOk,
      clear: clear,
      onOk: onOk,
    });
  };

const extendColumns = (
  columns: TableColumnsType<logServerType>,
  extendsColumns: TableColumnsType<logServerType>
) => {
  const newColumns = [...columns];

  extendsColumns.forEach((item) => {
    let idxInitCol = newColumns.findIndex((col) => col.key === item.key);
    newColumns[idxInitCol] = { ...newColumns[idxInitCol], ...item };
  });

  return newColumns;
};

const useColumnsTable = (
  columnsTitlesTable: TableColumnsType<logServerType>
) => {
  const [filteredInfo, setFilteredInfo] = useState<FilteredInfo>({});

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
      key: 'refers',
      filteredValue: filteredInfo.refers || null,
      onFilter: (value, record) => {
        if (value === 0) return record.refers === '';
        return record.refers !== '';
      },
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

  let columns = extendColumns(columnsTitlesTable, columnsTitlesExtends);

  return [columns, setFilteredInfo];
};

export default useColumnsTable;
