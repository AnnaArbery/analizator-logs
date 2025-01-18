import { useState } from 'react';
import { Table, TableColumnsType, TableProps } from 'antd';
import logServerType from '../types/logServerType.ts';
import useColumnsTable from '../hooks/useColumnsTable.ts';
import Panel from './Panel.tsx';
import Charts from './Charts/Charts.tsx';

type ContentProps = {
  list: logServerType[];
  columnsTitlesTable: TableColumnsType<logServerType>;
};

const Content = ({ list, columnsTitlesTable }: ContentProps) => {
  const [countFiltered, setCountFiltered] = useState(0);
  const [count, setCount] = useState(50);
  const [columns, setFilteredInfo] = useColumnsTable(columnsTitlesTable) as [
    TableColumnsType<logServerType>,
    (filters: { [key: string]: string[] }) => void
  ];
  const [typeChart, setTypeChart] = useState<0 | 1>(0);

  const onChange: TableProps<logServerType>['onChange'] = (filters, extra) => {
    if (extra.currentDataSource) {
      setCountFiltered(extra.currentDataSource.length);
    }
    setFilteredInfo(filters as { [key: string]: string[] });
  };

  const clearFilters = () => {
    setFilteredInfo({});
    setCountFiltered(0);
  };

  return (
    <div className='content'>
      <div className='grid'>
        <Charts list={list} typeChart={typeChart} />
        <Panel
          countList={list.length}
          countFiltered={countFiltered}
          clearFilters={clearFilters}
          typeChart={typeChart}
          handlerTypeChart={setTypeChart}
        />

        <div className='tableWrap'>
          <div className='tableContent'>
            <Table<logServerType>
              dataSource={list}
              columns={columns}
              pagination={{
                pageSizeOptions: ['30', '50', '100'],
                pageSize: count,
                onChange: (_, pageSize) => setCount(pageSize),
              }}
              scroll={{ y: 55 * 12 }}
              bordered
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
