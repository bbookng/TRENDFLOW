import * as S from './index.styles';
import SearchBar from '@/components/molecules/SearchBar';
import HotKeywords from '@/components/organisms/MainPage/HotKeywords';
import NoBookmark from '@/components/organisms/MainPage/NoBookmark';

const MainPage = () => {
  return (
    <S.Wrapper>
      <SearchBar />

      <S.HotKeywordsWrapper>
        <HotKeywords type="day" />
        <HotKeywords type="week" />
      </S.HotKeywordsWrapper>

      <NoBookmark />
    </S.Wrapper>
  );
};

export default MainPage;
