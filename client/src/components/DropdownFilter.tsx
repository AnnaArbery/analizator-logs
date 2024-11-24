import { Button, Checkbox, Input } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import type { FilterDropdownProps } from 'antd/es/table/interface';

type DropDownFilterProps = Pick<FilterDropdownProps, 'filters'> & {
  dataIndex: string;
  selectedKeys: React.Key[];
  setSelectedKeys: FilterDropdownProps['setSelectedKeys'];
  onPressEnter: () => void;
  clear: () => void;
  onOk: () => void;
};

const DropDownFilter = ({
  dataIndex,
  selectedKeys,
  filters = [],
  setSelectedKeys,
  onPressEnter,
  clear,
  onOk,
}: DropDownFilterProps) => {
  const [search, setSearch] = useState('');

  const handlerChange = (value: string[] | string) => {
    if (!Array.isArray(value)) {
      const clearedOldInput = selectedKeys.filter((item) => item !== search);
      setSelectedKeys(
        value ? [...clearedOldInput, value] : [...clearedOldInput]
      );
      setSearch(value);
    } else {
      const nameFilters = filters.map(({ text }) => text);
      const clearedOldCheck = selectedKeys.filter(
        (item) => !nameFilters.includes(item.toString())
      );
      setSelectedKeys([...clearedOldCheck, ...value]);
    }
  };

  const handlerClear = () => {
    clear();
    setSearch('');
  };

  return (
    <div onKeyDown={(e) => e.stopPropagation()}>
      <div className='ant-dropdown-menu'>
        <div
          className='ant-dropdown-menu__input'
          style={{
            padding:
              'var(--ant-dropdown-padding-block) 3px var(--ant-dropdown-padding-block) var(--ant-control-padding-horizontal)',
          }}
        >
          <Input
            placeholder={`Поиск по ${dataIndex}`}
            value={search}
            onChange={(e) => handlerChange(e.target.value)}
            onPressEnter={onPressEnter}
          />
        </div>

        {!!filters.length && (
          <Checkbox.Group
            onChange={handlerChange}
            value={selectedKeys as string[]}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {filters?.map((item) => (
              <Checkbox
                value={item.value}
                key={item.value as string}
                className='ant-dropdown-menu-item'
              >
                {item.text}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )}
      </div>

      <div className='ant-table-filter-dropdown-btns'>
        <Button
          disabled={!selectedKeys?.length}
          onClick={handlerClear}
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
