/* eslint-disable no-else-return */
import * as S from './index.styles';

const ContentItemSkeleton = (): React.ReactElement => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Thumbnail></S.Thumbnail>
        <S.TextContainer>
          <S.Title></S.Title>
          <S.Desc></S.Desc>
        </S.TextContainer>
      </S.Container>
      <S.Date>
        <S.DateInner></S.DateInner>
      </S.Date>
    </S.Wrapper>
  );
};

export default ContentItemSkeleton;
