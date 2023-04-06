import * as S from './index.styles';

const ChartSkeleton = (): React.ReactElement => {
  return (
    <S.Wrapper>
      <S.BarPaper>
        <S.Bar></S.Bar>
      </S.BarPaper>
    </S.Wrapper>
  );
};

export default ChartSkeleton;
