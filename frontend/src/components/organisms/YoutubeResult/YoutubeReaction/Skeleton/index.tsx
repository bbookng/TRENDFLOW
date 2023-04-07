import * as S from './index.styles';

const YoutubeReactSkeleton = (): React.ReactElement => {
  return (
    <S.Wrapper>
      <S.Title>유튜브 분석</S.Title>
      <S.ReactionPaper>
        <S.ReactionWrapper>
          <S.ReactionItem>
            <S.SvgIcon></S.SvgIcon>
            <S.Description></S.Description>
            <S.Count></S.Count>
          </S.ReactionItem>
          <S.ReactionItem>
            <S.SvgIcon></S.SvgIcon>
            <S.Description></S.Description>
            <S.Count></S.Count>
          </S.ReactionItem>
          <S.ReactionItem>
            <S.SvgIcon></S.SvgIcon>
            <S.Description></S.Description>
            <S.Count></S.Count>
          </S.ReactionItem>
        </S.ReactionWrapper>
      </S.ReactionPaper>
    </S.Wrapper>
  );
};

export default YoutubeReactSkeleton;
