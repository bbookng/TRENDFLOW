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

export interface BarChartPropsInterface {
  desktopWidth?: string;
  barColor?: string;
  labels: Array<string> | undefined;
  barLabel: string;
  lineLabel: string;
  barData: Array<number> | undefined;
  lineData: Array<number> | undefined;
}

const BarChart = ({
  desktopWidth,
  barColor,
  labels,
  barLabel,
  lineLabel,
  barData,
  lineData,
}: BarChartPropsInterface) => {
  const theme = useTheme();
  const data: any = {
    labels,
    datasets: [
      {
        label: lineLabel,
        yAxisID: 'peach',
        type: 'line',
        data: lineData,
        borderColor: theme.text,
        borderWidth: 1,
      },
      {
        label: barLabel,
        yAxisID: 'mention',
        type: 'bar',
        data: barData,
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
