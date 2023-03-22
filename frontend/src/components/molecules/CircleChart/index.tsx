import { useTheme } from '@emotion/react';
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CIRCLE_CHART_PALLETE } from '@/constants/palette';
import * as S from './index.styles';

Chart.register(ArcElement, Tooltip);

interface CircleChartPropsInterface {
  width: string;
  label: Array<string>;
  data: Array<number>;
}

const CircleChart = ({ width, label, data }: CircleChartPropsInterface) => {
  const theme = useTheme();

  const chartData = {
    labels: label,
    datasets: [
      {
        label: '언급량',
        data,
        backgroundColor: CIRCLE_CHART_PALLETE,
        borderWidth: 0,
        hoverOffset: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
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
  };

  return (
    <S.Wrapper width={width}>
      <Pie data={chartData} options={chartOptions} />
    </S.Wrapper>
  );
};

export default CircleChart;
