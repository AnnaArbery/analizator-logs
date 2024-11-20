import { Button, Input, Space, Checkbox, Divider } from 'antd';

const DropdownFilter = ({ filters, onChange, selectedKeys, clear, onOk }) => {
  return (
    <div className='filter-content'>
      <Checkbox.Group onChange={onChange} value={selectedKeys}>
        {filters?.map((item) => (
          <Checkbox value={item.value} key={item.value as string}>
            {item.text}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Divider />
      <div className='footer'>
        <Button type='link' disabled={!selectedKeys?.length} onClick={clear}>
          Reset
        </Button>
        <Button type='primary' onClick={onOk}>
          OK
        </Button>
      </div>
    </div>
  );
};

export default DropdownFilter;
