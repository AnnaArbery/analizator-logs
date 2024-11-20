import { Flex } from 'antd';

const Footer = () => {
  return (
    <footer>
      <div className='grid'>
        <Flex justify='space-between' align='center'>
          <div>Anna Arbery 2024</div>
          <div>
            <a href=''>GitHub репозиторий</a>
          </div>
        </Flex>
      </div>
    </footer>
  );
};

export default Footer;
