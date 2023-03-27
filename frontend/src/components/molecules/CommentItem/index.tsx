import { useState } from 'react';
import * as S from './index.styles';
import { Down, Up } from '@/assets';

const CommentItem = (): React.ReactElement => {
  const [isShow, setIsShow] = useState(false);

  const handleClickMoreBtn = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <S.Wrapper>
      <S.Comment>
        <S.CommentTextBox>
          <S.CommentText isShow={isShow}>
            장봄준의 거의 모든 곡은 봄과 어울리지만 빗속으로는 여름에 반바지입고 우산들고 비를 맞는
            느낌이라 빗속으로보다 봄비가 더 어울렸을거 같네요 장봄준의 거의 모든 곡은 봄과
            어울리지만 빗속으로는 여름에 반바지입고 우산들고 비를 맞는 느낌이라 빗속으로보다 봄비가
            더 어울렸을거 같네요 장봄준의 거의 모든 곡은 봄과 어울리지만 빗속으로는 여름에
            반바지입고 우산들고 비를 맞는 느낌이라 빗속으로보다 봄비가 더 어울렸을거 같네요 장봄준의
            거의 모든 곡은 봄과 어울리지만 빗속으로는 여름에 반바지입고 우산들고 비를 맞는 느낌이라
            빗속으로보다 봄비가 더 어울렸을거 같네요 장봄준의 거의 모든 곡은 봄과 어울리지만
            빗속으로는 여름에 반바지입고 우산들고 비를 맞는 느낌이라 빗속으로보다 봄비가 더
            어울렸을거 같네요
          </S.CommentText>
          <S.MoreBtn onClick={handleClickMoreBtn}>{isShow ? '숨기기' : '자세히 보기'}</S.MoreBtn>
        </S.CommentTextBox>
        <S.Thumbs>
          <S.ThumbItem>
            <Up />
            69
          </S.ThumbItem>
          <S.ThumbItem>
            <Down />
            19
          </S.ThumbItem>
        </S.Thumbs>
      </S.Comment>
    </S.Wrapper>
  );
};

export default CommentItem;
