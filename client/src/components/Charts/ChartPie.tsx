import { Card, Flex, Tag } from 'antd';
import logServerType from '../../types/logServerType';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement, //Pie
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement, //Pie
  Title,
  Tooltip,
  Legend
);

const titles: Record<string, string[]> = {
  xray: ['Пользователи', 'Пользователь'],
  Серверные: ['Статусы', 'Статус'],
  fail2ban: ['Действия', 'Действие'],
};

type chartDataProps = Record<string, { count: number; field: string }>;

const fields: Record<string, string> = {
  xray: 'user',
  fail2ban: 'action',
  Серверные: 'status',
};

const createListPie = (
  list: logServerType[],
  type: string
): [number[], string[]] => {
  const result: chartDataProps = {};
  const field = fields[type] as keyof logServerType;

  list.forEach((value) => {
    let id = value[field] as string;
    if (!result[id]) {
      result[id] = {
        count: 0,
        field: id,
      };
    }
    result[id].count += 1;
  });

  let count = Object.keys(result).map((value) => result[value].count);

  return [count, Object.keys(result)];
};

const ChartPie = ({ list, type }: { list: logServerType[]; type: string }) => {
  let [chartData, labels] = createListPie(list, type) || list;

  const optionsChart = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (context: any) => `${titles[type][1]} ${context[0].label}`,
          label: (context: any) =>
            `${Math.trunc((context.raw * 100) / list.length)}%(${context.raw})`,
        },
      },
    },
  };

  return (
    <Card bordered={false}>
      <Flex justify='center'>
        <Tag color='red'>{titles[type][0]}</Tag>
      </Flex>
      <Pie
        options={optionsChart}
        data={{
          labels: labels,
          datasets: [
            {
              label: '',
              borderColor: 'rgb(0,0,0,0.1)',
              backgroundColor: [
                '#E85A50',
                '#D8C3A4',
                'rgba(255,255,255,.5)',
                'rgba(0, 0, 0, 0.6)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              data: chartData,
            },
          ],
        }}
      />
    </Card>
  );
};

export default ChartPie;
