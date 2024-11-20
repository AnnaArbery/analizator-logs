import { Table as TableAnt } from 'antd';
import type { TableColumnsType } from 'antd';
import logServerType from '../../types/logServerType';
import { useState } from 'react';

type TableProps = {
  data: logServerType[];
  columns: TableColumnsType<logServerType>;
};

const Table = ({ data, columns }: TableProps) => {
  const [count, setCount] = useState(50);
  // @ts-ignore
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <TableAnt<logServerType>
      dataSource={data}
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
  );
};

export default Table;
