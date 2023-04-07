import * as S from './index.styles';

const CommentAffinitySkeleton = (): React.ReactElement => {
  return (
    <S.Wrapper>
      <S.Title>댓글 선호도 분석</S.Title>
      <S.AffinityPaper>
        <S.BarChart></S.BarChart>
        <S.ChartLabels></S.ChartLabels>
      </S.AffinityPaper>
    </S.Wrapper>
  );
};

export default CommentAffinitySkeleton;
