import React, { useEffect, useRef, useState } from 'react';
import * as S from './index.styles';
import { Down, Up } from '@/assets';

export interface CommentItemProps {
  comment: string;
  upCount: number;
  downCount: number;
  isLast: boolean;
  nextPage: () => void;
}

const CommentItem = ({
  comment,
  upCount,
  downCount,
  isLast,
  nextPage,
}: CommentItemProps): React.ReactElement => {
  const [isShow, setIsShow] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isLast && entry.isIntersecting) {
          nextPage();
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '100px',
      }
    );
    observer.observe(commentRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentRef, isLast]);
  const handleClickMoreBtn = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <S.Wrapper>
      <S.Comment ref={commentRef}>
        <S.CommentTextBox>
          <S.CommentText isShow={isShow}>{comment}</S.CommentText>
          <S.MoreBtn onClick={handleClickMoreBtn}>{isShow ? '숨기기' : '자세히 보기'}</S.MoreBtn>
        </S.CommentTextBox>
        <S.Thumbs>
          <S.ThumbItem>
            <Up />
            {upCount}
          </S.ThumbItem>
          <S.ThumbItem>
            <Down />
            {downCount}
          </S.ThumbItem>
        </S.Thumbs>
      </S.Comment>
    </S.Wrapper>
  );
};

export default CommentItem;
