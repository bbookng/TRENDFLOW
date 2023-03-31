/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from '@emotion/react';
import {
  Chart,
  Tooltip,
  Title,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PALETTE } from '@/constants/palette';
import * as S from './index.styles';

Chart.register(
  Tooltip,
  BarElement,
  Title,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const labels = ['3/18', '3/19', '3/20', '3/21', '3/22', '3/23', '3/24'];

interface BarChartPropsInterface {
  desktopWidth?: string;
  barColor?: string;
}

const BarChart = ({ desktopWidth, barColor }: BarChartPropsInterface) => {
  const theme = useTheme();
  const data: any = {
    labels,
    datasets: [
      {
        label: '피치 지수',
        yAxisID: 'peach',
        type: 'line',
        data: [33, 45, 87, 49, 81, 67, 72],
        borderColor: theme.text,
        borderWidth: 1,
      },
      {
        label: '언급량',
        yAxisID: 'mention',
        type: 'bar',
        data: [193, 10, 300, 124, 284, 84, 400],
        backgroundColor: barColor || PALETTE.BRAND400,
      },
    ],
  };
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: PALETTE.WHITE300,
        },
        ticks: {
          fontSize: 14,
          color: theme.text,
        },
      },
      peach: {
        id: '피치',
        type: 'linear',
        position: 'right',
        grid: {
          borderWidth: 0.5,
          color: PALETTE.WHITE300,
        },
        ticks: {
          min: 0,
          max: 100,
          stepSize: 25,
          fontSize: 14,
          color: theme.text,
          callback(value: string) {
            return `${value}%`;
          },
        },
      },
      mention: {
        type: 'linear',
        position: 'left',
        grid: {
          borderWidth: 0.5,
          color: PALETTE.WHITE300,
        },
        ticks: {
          stepSize: 100,
          fontSize: 14,
          color: theme.text,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme.background,
        titleFont: { family: 'PRETENDARD', size: 14 },
        titleColor: theme.text,

        bodyFont: { family: 'PRETENDARD', size: 12 },
        bodyColor: theme.text,

        borderWidth: 0.5,
        borderColor: theme.border,

        padding: 20,
      },
    },
    onHover: (event: any, chartElement: any) => {
      // eslint-disable-next-line no-param-reassign
      event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
    elements: {
      line: {
        tension: 0,
      },
      point: {
        radius: 3,
        borderColor: 'black',
        backgroundColor: 'white',
      },
    },
  };

  return (
    <S.Wrapper desktopWidth={desktopWidth}>
      <S.BarPaper>
        <Bar data={data} options={options} />
      </S.BarPaper>
    </S.Wrapper>
  );
};

export default BarChart;
