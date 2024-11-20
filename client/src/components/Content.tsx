// import { Table } from 'antd';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Table from './Table/Table.tsx';
// import columns from './Table/columns.ts';
import logServerType from '../types/logServerType.ts';
import { Card, Button, Input, Space, Divider } from 'antd';
// import { Select, Input, Segmented, Space } from 'antd';
import { InputRef, TableColumnsType, Checkbox } from 'antd';
import Highlighter from 'react-highlight-words';
import DropDownFilter from './Table/DropdownFilter.tsx';

type ContentProps = {
  list: logServerType[];
  columnsTitlesTable: TableColumnsType<logServerType>;
};

type DataIndex = keyof logServerType;

const Content = ({ list, columnsTitlesTable }: ContentProps) => {
  let columns = columnsTitlesTable;

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            // icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          {/* <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    // filterIcon: (filtered: boolean) => (
    //   <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    // ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    // filterDropdownProps: {
    //   onOpenChange(open) {
    //     if (open) {
    //       setTimeout(() => searchInput.current?.select(), 100);
    //     }
    //   },
    // },
    // render: (text: string) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  //
  const getColumnCheckboxGroupFilterDropdown =
    (onSearch: (value: string[]) => void, dataIndex) =>
    (props: FilterDropdownProps) => {
      const { setSelectedKeys, selectedKeys, confirm, clearFilters } = props;

      const clear = () => {
        setSelectedKeys([]);
        onSearch([]);
        clearFilters();
      };

      const onOk = () => {
        onSearch(selectedKeys as string[]);
        confirm();
      };

      return (
        <DropDownFilter
          dataIndex={dataIndex}
          selectedKeys={selectedKeys[0]}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          clear={clear}
          onOk={onOk}
        />
      );
    };

  const getTextFilterDropdown = (columnName: string) => {
    return ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: FilterDropdownProps) => (
      <div
        clearFilters={clearFilters}
        showClearButton={selectedKeys && selectedKeys.length > 0}
      >
        <Input
          placeholder={columnName}
          // @ts-ignore
          value={selectedKeys}
          onChange={(e) => {
            setSelectedKeys(e.target.value);
            // setFiltersApplied(true)
            confirm({ closeDropdown: false });
          }}
        />
      </div>
    );
  };

  //

  const columnsTitlesExtends: TableColumnsType<logServerType> = [
    {
      key: 'ip',
      onFilter: (value, record) =>
        record['ip']
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      // ...getColumnSearchProps('ip'),
      filterDropdown: getColumnCheckboxGroupFilterDropdown(
        (prev) => prev,
        'ip'
      ),
    },
    {
      key: 'url',
      onFilter: (value, record) =>
        record['url']
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      filterDropdown: getColumnCheckboxGroupFilterDropdown(
        (prev) => prev,
        'url'
      ),
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
      dataIndex: 'agent',
      key: 'agent',
      onFilter: (value, record: logServerType) =>
        record.agent.includes(value as string),
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
