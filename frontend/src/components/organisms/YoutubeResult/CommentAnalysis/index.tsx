import { useEffect, useMemo, useRef, useState } from 'react';
import { CommentItem } from '@/components/molecules';
import * as S from './index.styles';
import { YoutubeCommentInterface } from '@/types/youtube';
import { getComments } from '@/apis/keyword';

interface Props {
  link: string;
}

const CommentAnalysis = ({ link }: Props): React.ReactElement => {
  const [page, setPage] = useState<number>(1);
  const [code, setCode] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<YoutubeCommentInterface[]>([]);
  const getData = async () => {
    setIsLoading(true);
    const { data } = await getComments(link, code, page, 10);
    setComments((prev) => prev.concat(data));
    setIsLoading(false);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const handleClickFilter = (code: number) => {
    setComments([]);
    setCode(code);
    setPage(1);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, code]);
  return (
    <S.Wrapper>
      <S.Title>댓글 분석</S.Title>
      <S.CommentPaper>
        <S.Filter>
          <S.FilterBtn isClick={code === 0} onClick={() => handleClickFilter(0)} kind="positive">
            긍정
          </S.FilterBtn>
          <S.FilterBtn isClick={code === 1} onClick={() => handleClickFilter(1)} kind="negative">
            부정
          </S.FilterBtn>
          <S.FilterBtn isClick={code === 2} onClick={() => handleClickFilter(2)} kind="neutral">
            중립
          </S.FilterBtn>
        </S.Filter>
        {comments?.map((comment, index) => {
          return (
            <CommentItem
              key={comment.id}
              comment={comment.comment}
              upCount={comment.upCount}
              downCount={comment.downCount}
              isLast={index === comments.length - 1}
              nextPage={nextPage}
            />
          );
        })}
      </S.CommentPaper>
    </S.Wrapper>
  );
};

export default CommentAnalysis;
