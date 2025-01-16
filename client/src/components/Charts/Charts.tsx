import { Flex } from 'antd';
import ChartDate from './ChartDate';
import logServerType from '../../types/logServerType';
import { useContext } from 'react';
import LogsContext from '../../context/logsContext';
import ChartPie from './ChartPie';

const Charts = ({ list }: { list: logServerType[] }) => {
  const { options } = useContext(LogsContext);

  return (
    <Flex
      justify='space-between'
      style={{ marginBottom: '20px' }}
      className='charts'
    >
      <ChartDate list={list} type={options.title} />
      <ChartPie list={list} type={options.title} />
    </Flex>
  );
};

export default Charts;
