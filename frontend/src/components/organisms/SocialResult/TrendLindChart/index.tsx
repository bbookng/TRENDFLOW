import { Typography } from '@/components/atoms/Typography/index.styles';
import LineChart from '@/components/molecules/LineChart';
import * as S from './index.styles';

const TrendLineChart = () => {
  return (
    <S.Container>
      <Typography variant="H3">긍부정 추이</Typography>
      <S.LineChartWrapper>
        <LineChart />
      </S.LineChartWrapper>
    </S.Container>
  );
};

export default TrendLineChart;
