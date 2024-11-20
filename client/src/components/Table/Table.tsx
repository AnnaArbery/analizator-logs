import { Table as TableAnt } from 'antd';
import type { TableColumnsType } from 'antd';
import logServerType from '../../types/logServerType';

type TableProps = {
  data: logServerType[];
  columns: TableColumnsType<logServerType>;
};

const Table = ({ data, columns }: TableProps) => {
  // @ts-ignore
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <TableAnt<logServerType>
      dataSource={data}
      columns={columns}
      pagination={{ pageSize: 50 }}
      scroll={{ y: 55 * 12 }}
      bordered
      onChange={onChange}
    />
  );
};

export default Table;
