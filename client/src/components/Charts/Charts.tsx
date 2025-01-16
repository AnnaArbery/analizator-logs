import { Flex } from 'antd';
import ChartDate from './ChartDate';
import logServerType from '../../types/logServerType';
import { useContext } from 'react';
import LogsContext from '../../context/logsContext';
import ChartPie from './ChartPie';
import { useMediaQuery } from '@uidotdev/usehooks';

const Charts = ({
  list,
  typeChart,
}: {
  list: logServerType[];
  typeChart: 0 | 1;
}) => {
  const { options } = useContext(LogsContext);
  const isSmallDevice = useMediaQuery('only screen and (max-width : 560px)');

  return (
    <Flex justify='space-between' className='charts' vertical={isSmallDevice}>
      {(typeChart === 0 || !isSmallDevice) && (
        <div className='chartWrap'>
          <ChartDate list={list} type={options.title} />
        </div>
      )}
      {(typeChart === 1 || !isSmallDevice) && (
        <div className='chartWrap'>
          <ChartPie list={list} type={options.title} />
        </div>
      )}
    </Flex>
  );
};

export default Charts;
