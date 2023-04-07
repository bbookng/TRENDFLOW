import * as S from './index.styles';

const CommentAnalysisSkeleton = (): React.ReactElement => {
  return (
    <S.Wrapper>
      <S.Title>댓글 분석</S.Title>
      <S.CommentPaper>
        <S.SkeletonContent></S.SkeletonContent>
      </S.CommentPaper>
    </S.Wrapper>
  );
};

export default CommentAnalysisSkeleton;
