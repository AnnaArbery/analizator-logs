import { Flex } from 'antd';
import type { MenuProps } from 'antd';
import { useContext } from 'react';
import LogsContext from '../context/logsContext';

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

const Header = ({ title }: { title: string }) => {
  return (
    <header>
      <div className='grid'>
        <Flex justify='space-between' align='center'>
          <h1>Анализатор логов</h1>
          <div className='ant-btn css-var-r0 ant-btn-default ant-btn-color-default ant-btn-variant-outlined header-button'>
            {title}
          </div>
        </Flex>
      </div>
    </header>
  );
};

export default Header;
