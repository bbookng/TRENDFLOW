import { Like, Message, Video } from '@/assets';
import SvgIcon from '@/components/molecules/SvgIcon';
import { convertCount } from '@/utils/convert';
import * as S from './index.styles';

export interface YoutubeReactionProps {
  viewCount: number | undefined;
  likeCount: number | undefined;
  commentCount: number | undefined;
}

const YoutubeReaction = ({
  viewCount,
  likeCount,
  commentCount,
}: YoutubeReactionProps): React.ReactElement => {
  return (
    <S.Wrapper>
      <S.Title>유튜브 반응</S.Title>
      <S.ReactionPaper>
        <S.ReactionWrapper>
          <S.ReactionItem>
            <SvgIcon size={96}>
              <Video />
            </SvgIcon>
            <S.Description>조회수</S.Description>
            <S.Count>{convertCount(viewCount)}</S.Count>
          </S.ReactionItem>

          <S.ReactionItem>
            <SvgIcon size={96}>
              <Like />
            </SvgIcon>
            <S.Description>좋아요 수</S.Description>
            <S.Count>{convertCount(likeCount)}</S.Count>
          </S.ReactionItem>

          <S.ReactionItem>
            <SvgIcon size={96}>
              <Message />
            </SvgIcon>
            <S.Description>조회수</S.Description>
            <S.Count>{convertCount(commentCount)}</S.Count>
          </S.ReactionItem>
        </S.ReactionWrapper>
      </S.ReactionPaper>
    </S.Wrapper>
  );
};

export default YoutubeReaction;
