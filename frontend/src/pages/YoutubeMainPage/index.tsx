import { SearchBar } from '@/components/molecules';
import * as S from './index.styles';

const YoutubeMainPage = () => {
  return (
    <S.Wrapper>
      <SearchBar placeholder="유튜브 링크를 입력하세요." />
    </S.Wrapper>
  );
};

export default YoutubeMainPage;
