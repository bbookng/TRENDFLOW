import { useState } from 'react';
import * as S from './index.styles';
import { Down, Up } from '@/assets';

export interface CommentItemProps {
  comment: string;
  upCount: number;
  downCount: number;
}

const CommentItem = ({ comment, upCount, downCount }: CommentItemProps): React.ReactElement => {
  const [isShow, setIsShow] = useState(false);

  const handleClickMoreBtn = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <S.Wrapper>
      <S.Comment>
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
