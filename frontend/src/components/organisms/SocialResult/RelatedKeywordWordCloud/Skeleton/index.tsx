import * as S from './index.styles';

const RelatedKeywordWordCloudSkeleton = (): React.ReactElement => {
  return (
    <S.Wrapper>
      <S.SpaceTypography variant="H4">연관 키워드</S.SpaceTypography>
      <S.WordCloudPaper>
        <S.WordCloudContentsWrapper></S.WordCloudContentsWrapper>
      </S.WordCloudPaper>
    </S.Wrapper>
  );
};

export default RelatedKeywordWordCloudSkeleton;
