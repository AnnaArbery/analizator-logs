import { Flex } from 'antd';
import { useMediaQuery } from '@uidotdev/usehooks';

const Header = ({ title }: { title: string }) => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 420px)');
  return (
    <header>
      <div className='grid'>
        <Flex justify='space-between' align='center' vertical={isSmallDevice}>
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
