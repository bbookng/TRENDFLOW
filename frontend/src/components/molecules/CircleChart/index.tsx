import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CIRCLE_CHART_PALLETE, PALETTE } from '@/constants/palette';
import { useAppSelector } from '@/hooks/storeHook';
import * as S from './index.styles';

Chart.register(ArcElement, Tooltip);
Chart.defaults.color = 'red';

interface CircleChartPropsInterface {
  width: string;
  label: Array<string>;
  data: Array<number>;
}

const CircleChart = ({ width, label, data }: CircleChartPropsInterface) => {
  const { isDark } = useAppSelector((state) => state);

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
        backgroundColor: isDark ? `${PALETTE.BLACK300}` : `${PALETTE.WHITE100}`,

        titleFont: { family: 'PRETENDARD', size: 14 },
        titleColor: isDark ? `${PALETTE.WHITE100}` : `${PALETTE.BLACK400}`,

        bodyFont: { family: 'PRETENDARD', size: 12 },
        bodyColor: isDark ? `${PALETTE.WHITE100}` : `${PALETTE.BLACK400}`,

        borderWidth: 0.5,
        borderColor: isDark ? `${PALETTE.WHITE300}` : `${PALETTE.BLACK100}`,

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
