import { Flex } from 'antd';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.antgroup.com'
      >
        Серверные логи
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.aliyun.com'
      >
        journalctl
      </a>
    ),
  },
];

const Header = () => {
  return (
    <header>
      <div className='grid'>
        <Flex justify='space-between' align='center'>
          <h1>Анализатор логов</h1>
          <Dropdown menu={{ items }} placement='bottomLeft'>
            <Button>Серверные логи</Button>
          </Dropdown>
        </Flex>
      </div>
    </header>
  );
};

export default Header;
