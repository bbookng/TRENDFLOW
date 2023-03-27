import { Label } from '@/components/atoms';
import * as S from './index.styles';

const CommentAnalysis = (): React.ReactElement => {
  return (
    <S.Wrapper>
      <Label>댓글 분석</Label>
      <S.CommentPaper></S.CommentPaper>
    </S.Wrapper>
  );
};

export default CommentAnalysis;
