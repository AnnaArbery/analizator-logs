import { useState } from 'react';
import { Table, TableColumnsType, TableProps } from 'antd';
import logServerType from '../types/logServerType.ts';
import { Card, Button } from 'antd';
import useColumnsTable from '../hooks/useColumnsTable.ts';

type ContentProps = {
  list: logServerType[];
  columnsTitlesTable: TableColumnsType<logServerType>;
};

const Content = ({ list, columnsTitlesTable }: ContentProps) => {
  const [countFilterd, setCountFiltered] = useState(0);
  const [count, setCount] = useState(50);
  const [columns, setFilteredInfo] = useColumnsTable(columnsTitlesTable) as [
    TableColumnsType<logServerType>,
    (filters: { [key: string]: string[] }) => void
  ];

  const onChange: TableProps<logServerType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // console.log('Table.tsx, filters', pagination, filters, sorter, extra);
    console.log(sorter);
    setCountFiltered(extra.currentDataSource.length);
    setFilteredInfo(filters as { [key: string]: string[] });
  };

  const clearFilters = () => {
    setFilteredInfo({});
    setCountFiltered(0);
  };

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
