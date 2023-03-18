import SearchBar from '@/components/molecules/SearchBar';
import HotKeywords from '@/components/organisms/MainPage/HotKeywords';
import NoBookmark from '@/components/organisms/MainPage/NoBookmark';

const MainPage = () => {
  return (
    <>
      <SearchBar />
      <HotKeywords type="day" />
      <HotKeywords type="week" />
      <NoBookmark />
    </>
  );
};

export default MainPage;
