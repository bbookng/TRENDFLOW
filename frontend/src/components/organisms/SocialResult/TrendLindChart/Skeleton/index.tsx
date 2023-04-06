import * as S from './index.styles';

const TrendLineChartSkeleton = () => {
  return (
    <S.Container>
      <S.Title>긍부정 추이</S.Title>
      <S.Wrapper>
        <S.LineChartSkeleton />
      </S.Wrapper>
    </S.Container>
  );
};

export default TrendLineChartSkeleton;
