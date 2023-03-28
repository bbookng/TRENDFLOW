import { ContentItem } from '@/components/molecules';
import * as S from './index.styles';

const ContentList = () => {
  return (
    <S.Wrapper>
      <ContentItem />
      <ContentItem />
      <ContentItem />
    </S.Wrapper>
  );
};

export default ContentList;
