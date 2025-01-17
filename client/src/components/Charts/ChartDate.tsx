import { Card, Flex, Tag } from 'antd';
import logServerType from '../../types/logServerType';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const months = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
];

const createDateTitle = (date: number) => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
  }).format(date);
};

const ChartDate = ({ list, type }: { list: logServerType[]; type: string }) => {
  let chartData = new Map();

  list.forEach((value) => {
    const date = new Date(value.date);
    const day = date.getDate();
    const hours = date.getHours();
    const year = date.getFullYear().toString().slice(-2);
    const month = date.getMonth();

    if (type === 'xray' && value.user === '-') return;
    const id: string = `${day}${hours}`;

    if (!chartData.has(id)) {
      chartData.set(id, {
        count: 0,
        date: `${day} ${months[month]} ${year}г.`,
        hour: `${hours} чac, ${day < 10 ? '0' + day : day}.${
          month < 10 ? '0' + month : month
        }`,
      });
    }
    let current = chartData.get(id);
    chartData.set(id, { ...current, count: current.count + 1 });
  });

  const optionsChart = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context: any) =>
            `${context[0].raw.date} ${context[0].raw.hour}`,
        },
      },
    },
  };

  return (
    <Card bordered={false}>
      <Flex justify='center'>
        <Tag color='red'>
          {`${createDateTitle(list[0]?.date)} часов - ${createDateTitle(
            list[list.length - 1]?.date
          )} часов`}
        </Tag>
      </Flex>

      <Bar
        options={optionsChart}
        data={{
          datasets: [
            {
              label: '',
              backgroundColor: '#E85A50',
              data: [...chartData.values()],
              parsing: {
                xAxisKey: 'hour',
                yAxisKey: 'count',
              },
            },
          ],
        }}
      />
    </Card>
  );
};

export default ChartDate;
