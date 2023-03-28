import { Typography } from '@/components/atoms/Typography/index.styles';
import LineChart from '@/components/molecules/LineChart';
import * as S from './index.styles';

interface TrendLineChartProps {
  text: string;
}

const TrendLineChart = ({ text }: TrendLineChartProps) => {
  return (
    <S.Container>
      <S.SpaceTypography variant="H3">{text}</S.SpaceTypography>
      <LineChart />
    </S.Container>
  );
};

export default TrendLineChart;
