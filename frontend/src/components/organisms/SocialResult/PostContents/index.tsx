import { Typography } from '@/components/atoms';
import { ContentItem } from '@/components/molecules';
import * as S from './index.styles';

interface PostContentsPropsInterface {
  title: string;
}

const PostContents = ({ title }: PostContentsPropsInterface) => {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <Typography variant="LARGE" weight="bold">
          {title}
        </Typography>
        <S.Link to="/">더보기</S.Link>
      </S.TitleWrapper>
      <S.PostWrapper className="post">
        <ContentItem />
        <ContentItem />
        <ContentItem />
      </S.PostWrapper>
    </S.Wrapper>
  );
};

export default PostContents;
