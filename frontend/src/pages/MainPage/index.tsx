/* eslint-disable react-hooks/exhaustive-deps */
// import { useGetSocialAnalysisQuery } from '@/apis/analyze';
// import { useGetHotKeywordQuery, useGetRelatedKeywordQuery } from '@/apis/keyword';
import { SearchBar } from '@/components/molecules';
import { NoBookmark } from '@/components/organisms/MainPage';
// import { HotKeywords, NoBookmark, DailyAnalysis } from '@/components/organisms/MainPage';
import * as S from './index.styles';

const MainPage = () => {
  // TODO🍇메인 API 완성되면 주석 해제
  // const {
  //   data: hotKeywords,
  //   error: hotKeywordsError,
  //   isLoading: hotKeywordsLoading,
  // } = useGetHotKeywordQuery();

  // const {
  //   data: relatedKeywords,
  //   error: relatedKeywordsError,
  //   isLoading: relatedKeywordsLoading,
  // } = useGetRelatedKeywordQuery();

  // const {
  //   data: socialAnalysis,
  //   error: socialAnalysisError,
  //   isLoading: socailAnaysisLoading,
  // } = useGetSocialAnalysisQuery();

  // if (hotKeywordsLoading || relatedKeywordsLoading || socailAnaysisLoading) {
  //   return <p>로딩중</p>;
  // }

  return (
    <S.Wrapper>
      <SearchBar />

      {/* <S.HotKeywordsWrapper>
        <HotKeywords type="day" ranking={hotKeywords!.day} />
        <HotKeywords type="week" ranking={hotKeywords!.week} />
      </S.HotKeywordsWrapper> */}

      <NoBookmark />

      {/* <DailyAnalysis
        keyword="싸피"
        socialAnaysis={socialAnalysis!}
        relatedKeywords={relatedKeywords!}
      /> */}
    </S.Wrapper>
  );
};

export default MainPage;
