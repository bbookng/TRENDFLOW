import { useLocation } from 'react-router-dom';
import { CompareSearchBar } from '@/components/molecules';
import { Typography } from '@/components/atoms';
import { HighLight } from '@/pages/SocialResultPage/index.styles';
import * as S from './index.styles';

const ComparisonResultPage = () => {
  const location = useLocation();
  const { keyword1, keyword2 } = location.state;

  return (
    <S.TitleWrapper>
      <CompareSearchBar keywords={[keyword1, keyword2]} />
      <Typography variant="H2">
        <HighLight>{keyword1}</HighLight> vs <HighLight>{keyword2}</HighLight> 비교 분석 레포트
      </Typography>
    </S.TitleWrapper>
  );
};

export default ComparisonResultPage;
