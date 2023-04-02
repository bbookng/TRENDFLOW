import { useEffect, useRef } from 'react';
import { CommentItem } from '@/components/molecules';
import * as S from './index.styles';
import { YoutubeCommentInterface } from '@/types/youtube';

interface Props {
  comments: Array<YoutubeCommentInterface>;
}

const CommentAnalysis = ({ comments }: Props): React.ReactElement => {
  return (
    <S.Wrapper>
      <S.Title>댓글 분석</S.Title>
      <S.CommentPaper>
        <S.Filter>
          <S.FilterBtn kind="positive">긍정</S.FilterBtn>
          <S.FilterBtn kind="negative">부정</S.FilterBtn>
          <S.FilterBtn kind="neutral">중립</S.FilterBtn>
        </S.Filter>
        {comments?.map((comment, index) => {
          return (
            <CommentItem
              key={comment.id}
              comment={comment.comment}
              upCount={comment.upCount}
              downCount={comment.downCount}
            />
          );
        })}
      </S.CommentPaper>
    </S.Wrapper>
  );
};

export default CommentAnalysis;
