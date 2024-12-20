import { Card, Button } from 'antd';
import { useState } from 'react';
import Settings from './Settings/Settings';

type PanelProps = {
  countList: number;
  countFiltered: number;
  clearFilters: () => void;
};

const Panel = ({ countList, countFiltered, clearFilters }: PanelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        <Button
          type='primary'
          onClick={() => setIsModalOpen(true)}
          style={{ marginRight: '10px' }}
        >
          Настройки
        </Button>
        <Button type='primary' onClick={clearFilters}>
          Сброс фильтров
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
