import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '@emotion/react';
import * as S from './index.styles';
import { PALETTE } from '@/constants/palette';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = () => {
  const theme = useTheme();

  const labels = ['3/18', '3/19', '3/20', '3/21', '3/22', '3/23', '3/24', '3/25', '3/26', '3/27'];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: { family: 'PRETENDARD', size: 14 },
          boxWidth: 20,
          boxHeight: 2,
        },
      },
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      tooltip: {
        backgroundColor: theme.background,
        titleFont: { family: 'PRETENDARD', size: 14 },
        titleColor: theme.text,
        bodyFont: { family: 'PRETENDARD', size: 12 },
        bodyColor: theme.text,
        padding: 15,
      },
    },
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

      y: {
        grid: {
          color: PALETTE.WHITE300,
        },
        ticks: {
          fontSize: 14,
          color: theme.text,
        },
      },
    },
    pointRadius: 3,
    pointHoverRadius: 3,
    borderWidth: 2,
    pointHoverBorderWidth: 3,
    hoverBorderWidth: 2,
  };

  const data = {
    labels,
    datasets: [
      {
        label: '긍정',
        data: [20, 100, 150, 80, 50, 300, 245, 300, 110, 80],
        borderColor: theme.positive,
        backgroundColor: theme.positive,
        pointBorderColor: theme.positive,
        hoverBackgroundColor: PALETTE.WHITE100,
      },
      {
        label: '중립',
        data: [0, 35, 78, 145, 245, 211, 178, 190, 44, 20, 65],
        borderColor: theme.neutrality,
        backgroundColor: theme.neutrality,
        pointBorderColor: theme.neutrality,
        hoverBackgroundColor: PALETTE.WHITE100,
      },
      {
        label: '부정',
        data: [100, 50, 89, 98, 150, 200, 50, 100, 156, 200],
        borderColor: theme.negative,
        backgroundColor: theme.negative,
        pointBorderColor: theme.negative,
        hoverBackgroundColor: PALETTE.WHITE100,
      },
    ],
  };
  return (
    <S.Container>
      <Line options={options} data={data} style={{ height: '100%', width: '100%' }} />
    </S.Container>
  );
};

export default LineChart;
