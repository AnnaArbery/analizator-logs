import { List } from 'antd';

type FieldsNewProps = {
  [key: string]: string;
};
type ListColumnsProps = {
  columns: string[];
  setColumns: (cb: (value: FieldsNewProps) => FieldsNewProps) => void;
};

const ListColumns = ({ columns, setColumns }: ListColumnsProps) => {
  console.log(columns, 'listcolumns');
  // const handlerChange = (value: string, name: string) => {
  //   let fields_new = fields.reduce((acc, item, idx) => {
  //     if (item === name) acc[idx] = value;
  //     else acc[idx] = item;
  //     return acc;
  //   }, [] as string[]);

  //   setFields(fields_new)
  // }

  return (
    <>
      <List
        size='small'
        bordered
        dataSource={columns}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );
};

export default ListColumns;
