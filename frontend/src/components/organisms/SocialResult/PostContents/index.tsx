import { Typography } from '@/components/atoms';
import { ContentItem } from '@/components/molecules';
import * as S from './index.styles';

const PostContents = () => {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <Typography variant="LARGE" weight="bold">
          관련기사
        </Typography>
        <S.Link to="/">더보기</S.Link>
      </S.TitleWrapper>
      <S.PostWrapper>
        <ContentItem />
        <ContentItem />
        <ContentItem />
      </S.PostWrapper>
    </S.Wrapper>
  );
};

export default PostContents;
