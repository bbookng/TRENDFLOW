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
import { SocialAnalysisItemInterface } from '@/types/social';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface LineChartPropsInterface {
  socialAnalysisData: SocialAnalysisItemInterface[];
}

const LineChart = ({ socialAnalysisData }: Partial<LineChartPropsInterface>) => {
  const theme = useTheme();

  const labels = socialAnalysisData?.map((data) => data.date.slice(5));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { family: 'PRETENDARD', size: 14 },
          boxWidth: 20,
          boxHeight: 2,
          color: theme.text,
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
        data: socialAnalysisData?.map((data) => Number(data.grapeQuotientInfo.positive.toFixed(2))),
        borderColor: theme.positive,
        backgroundColor: theme.positive,
        pointBorderColor: theme.positive,
        hoverBackgroundColor: PALETTE.WHITE100,
      },
      {
        label: '중립',
        data: socialAnalysisData?.map((data) => Number(data.grapeQuotientInfo.neutral.toFixed(2))),
        borderColor: theme.neutrality,
        backgroundColor: theme.neutrality,
        pointBorderColor: theme.neutrality,
        hoverBackgroundColor: PALETTE.WHITE100,
      },
      {
        label: '부정',
        data: socialAnalysisData?.map((data) => Number(data.grapeQuotientInfo.negative.toFixed(2))),
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
