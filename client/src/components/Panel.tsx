import { Card, Button } from 'antd';
import { useState } from 'react';
import Settings from './Settings/Settings';
import {
  BarChartOutlined,
  ClearOutlined,
  PieChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from '@uidotdev/usehooks';

type PanelProps = {
  countList: number;
  countFiltered: number;
  typeChart: number;
  clearFilters: () => void;
  handlerTypeChart: (prev: any) => void;
};

const Panel = ({
  countList,
  countFiltered,
  clearFilters,
  typeChart,
  handlerTypeChart,
}: PanelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSmallDevice = useMediaQuery('only screen and (max-width : 560px)');

  const changeTypeChart = () => {
    // @ts-ignore
    handlerTypeChart((prev) => (prev === 1 ? 0 : 1));
  };

  return (
    <div className='tableSettings'>
      <Card bordered={false}>
        <div className='tableCount' style={{ marginRight: 'auto' }}>
          {countFiltered !== 0 && countFiltered !== countList && (
            <>Выбрано {countFiltered} из </>
          )}
          {(countFiltered === 0 || countFiltered === countList) && (
            <>Всего строк </>
          )}
          {countList}
        </div>

        {isSmallDevice && (
          <Button
            type='primary'
            style={{ marginRight: '10px' }}
            onClick={changeTypeChart}
          >
            {typeChart === 1 && <BarChartOutlined />}
            {typeChart === 0 && <PieChartOutlined />}
          </Button>
        )}

        <Button
          type='primary'
          onClick={() => setIsModalOpen(true)}
          style={{ marginRight: '10px' }}
        >
          {!isSmallDevice ? <span>Настройки</span> : <SettingOutlined />}
        </Button>
        <Button type='primary' onClick={clearFilters}>
          {!isSmallDevice ? <span>Сброс фильтров</span> : <ClearOutlined />}
        </Button>
      </Card>
      <Settings
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        clearFilters={clearFilters}
      />
    </div>
  );
};

export default Panel;
