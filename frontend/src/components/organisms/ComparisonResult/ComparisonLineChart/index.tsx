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
import { PALETTE } from '@/constants/palette';
import { ComparisionAnalysisItemInterface } from '@/types/comparison';
import * as S from './index.styles';
import {
  Container,
  SpaceTypography,
} from '@/components/organisms/SocialResult/TrendLindChart/index.styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ComparisonLineChartPropsInterface {
  title: string;
  keyword1: string;
  keyword2: string;
  comparisonData: Array<ComparisionAnalysisItemInterface>;
}

const ComparisonLineChart = ({
  title,
  keyword1,
  keyword2,
  comparisonData,
}: ComparisonLineChartPropsInterface) => {
  const theme = useTheme();
  const labels = comparisonData?.map((data) => data.date);

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
        label: keyword1,
        data: comparisonData?.map((data) => data.keyword1),
        borderColor: theme.positive,
        backgroundColor: theme.positive,
        pointBorderColor: theme.positive,
        hoverBackgroundColor: PALETTE.WHITE100,
      },
      {
        label: keyword2,
        data: comparisonData?.map((data) => data.keyword2),
        borderColor: theme.negative,
        backgroundColor: theme.negative,
        pointBorderColor: theme.negative,
        hoverBackgroundColor: PALETTE.WHITE100,
      },
    ],
  };

  return (
    <Container>
      <SpaceTypography variant="H3">{title}</SpaceTypography>
      <S.Container>
        <Line options={options} data={data} style={{ height: '100%', width: '100%' }} />
      </S.Container>
    </Container>
  );
};

export default ComparisonLineChart;
