import { Typography } from '@/components/atoms/Typography/index.styles';
import LineChart from '@/components/molecules/LineChart';
import { SocialAnalysisItemInterface } from '@/types/social';
import * as S from './index.styles';

interface TrendLineChartProps {
  text: string;
  socialAnalysisData: SocialAnalysisItemInterface[];
}

const TrendLineChart = ({ text, socialAnalysisData }: TrendLineChartProps) => {
  return (
    <S.Container>
      <S.Title>{text}</S.Title>
      <LineChart socialAnalysisData={socialAnalysisData} />
    </S.Container>
  );
};

export default TrendLineChart;
