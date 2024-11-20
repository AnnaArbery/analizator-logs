import { Button, Divider, Input, Space } from 'antd';
import React from 'react';

export interface FilterConfirmProps {
  closeDropdown: boolean;
}

export interface ColumnFilterItem {
  text: React.ReactNode;
  value: string | number | boolean;
  children?: ColumnFilterItem[];
}

export interface FilterDropdownProps {
  prefixCls: string;
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: (param?: FilterConfirmProps) => void;
  clearFilters?: () => void;
  filters?: ColumnFilterItem[];
  visible: boolean;
}

// const DropdownFilter = ({dataIndex, onChange, selectedKeys, handleSearch, close, }) => {
//   return (
//     <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
//     <Input
//       ref={searchInput}
//       placeholder={`Search ${dataIndex}`}
//       value={selectedKeys[0]}
//       onChange={(e) =>
//         setSelectedKeys(e.target.value ? [e.target.value] : [])
//       }
//       onPressEnter={() =>
//         handleSearch(selectedKeys as string[], confirm, dataIndex)
//       }
//       style={{ marginBottom: 8, display: 'block' }}
//     />
//     <Space>
//       <Button
//         type='primary'
//         onClick={() =>
//           handleSearch(selectedKeys as string[], confirm, dataIndex)
//         }
//         // icon={<SearchOutlined />}
//         size='small'
//         style={{ width: 90 }}
//       >
//         Search
//       </Button>
//       <Button
//         onClick={() => clearFilters && handleReset(clearFilters)}
//         size='small'
//         style={{ width: 90 }}
//       >
//         Reset
//       </Button>
//       {/* <Button
//         type='link'
//         size='small'
//         onClick={() => {
//           confirm({ closeDropdown: false });
//           setSearchText((selectedKeys as string[])[0]);
//           setSearchedColumn(dataIndex);
//         }}
//       >
//         Filter
//       </Button> */}
//       <Button
//         type='link'
//         size='small'
//         onClick={() => {
//           close();
//         }}
//       >
//         close
//       </Button>
//     </Space>
//   </div>
//   );
// };

const DropDownFilter = ({
  dataIndex,
  selectedKeys,
  onChange,
  onPressEnter,
  clear,
  onOk,
}) => {
  return (
    <div onKeyDown={(e) => e.stopPropagation()}>
      <div className='ant-dropdown-menu'>
        <Input
          // ref={searchInput}
          placeholder={`Поиск ${dataIndex}`}
          value={selectedKeys}
          onChange={onChange}
          onPressEnter={onPressEnter}
        />
      </div>

      <div className='ant-table-filter-dropdown-btns'>
        <Button
          disabled={!selectedKeys?.length}
          onClick={clear}
          type='link'
          size='small'
        >
          Reset
        </Button>
        <Button type='primary' size='small' onClick={onOk}>
          ОК
        </Button>
      </div>
    </div>
  );
};

export default DropDownFilter;
