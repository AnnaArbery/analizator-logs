import { Button, Checkbox, Input } from 'antd';
import React, { ChangeEvent } from 'react';
import type { FilterDropdownProps } from 'antd/es/table/interface';

type DropDownFilterProps = Pick<FilterDropdownProps, 'filters'> & {
  selectedKeys: React.Key[];
  dataIndex: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeCheckbox?: () => void;
  onPressEnter: () => void;
  clear: () => void;
  onOk: () => void;
};

const DropDownFilter = ({
  dataIndex,
  selectedKeys,
  filters = [],
  onChange,
  onChangeCheckbox,
  onPressEnter,
  clear,
  onOk,
}: DropDownFilterProps) => {
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
            value={selectedKeys[0]}
            onChange={onChange}
            onPressEnter={onPressEnter}
          />
        </div>

        {!!filters.length && (
          <Checkbox.Group
            onChange={onChangeCheckbox}
            value={selectedKeys}
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
