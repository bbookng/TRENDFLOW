/* eslint-disable react-hooks/exhaustive-deps */
import { useGetSocialAnalysisQuery } from '@/apis/analyze';
import { useGetHotKeywordQuery, useGetRelatedKeywordQuery } from '@/apis/keyword';
import { SearchBar } from '@/components/molecules';
import { HotKeywords, NoBookmark, DailyAnalysis } from '@/components/organisms/MainPage';
import * as S from './index.styles';

// 목업 데이터
const rankingList: RankingListInterface = {
  day: [
    {
      rank: 1,
      keyword: '싸피',
      type: 'up',
      step: 2,
      mentionCount: 2023,
    },
    {
      rank: 2,
      keyword: '삼성전자',
      type: 'down',
      step: 1,
      mentionCount: 1823,
    },
    {
      rank: 3,
      keyword: '삼성전기',
      type: 'new',
      mentionCount: 1623,
    },
    {
      rank: 4,
      keyword: '신세계',
      type: 'same',
      mentionCount: 1423,
    },
    {
      rank: 5,
      keyword: '호텔신라',
      type: 'up',
      step: 3,
      mentionCount: 1223,
    },
    {
      rank: 6,
      keyword: '삼성SDS',
      type: 'up',
      step: 1,
      mentionCount: 1023,
    },
    {
      rank: 7,
      keyword: '삼성SDI',
      type: 'down',
      step: 1,
      mentionCount: 823,
    },
    {
      rank: 8,
      keyword: '삼성전자',
      type: 'new',
      mentionCount: 623,
    },
  ],
  week: [
    {
      rank: 1,
      keyword: '싸피',
      type: 'up',
      step: 2,
      mentionCount: 2023,
    },
    {
      rank: 2,
      keyword: '삼성전자',
      type: 'down',
      step: 1,
      mentionCount: 1823,
    },
    {
      rank: 3,
      keyword: '삼성전기',
      type: 'new',
      mentionCount: 1623,
    },
    {
      rank: 4,
      keyword: '신세계',
      type: 'same',
      mentionCount: 1423,
    },
    {
      rank: 5,
      keyword: '호텔신라',
      type: 'up',
      step: 3,
      mentionCount: 1223,
    },
    {
      rank: 6,
      keyword: '삼성SDS',
      type: 'up',
      step: 1,
      mentionCount: 1023,
    },
    {
      rank: 7,
      keyword: '삼성SDI',
      type: 'down',
      step: 1,
      mentionCount: 823,
    },
    {
      rank: 8,
      keyword: '삼성전자',
      type: 'new',
      mentionCount: 623,
    },
  ],
};


const MainPage = () => {
  const {
    data: hotKeywords,
    error: hotKeywordsError,
    isLoading: hotKeywordsLoading,
  } = useGetHotKeywordQuery();

  const {
    data: relatedKeywords,
    error: relatedKeywordsError,
    isLoading: relatedKeywordsLoading,
  } = useGetRelatedKeywordQuery();

  const {
    data: socialAnalysis,
    error: socialAnalysisError,
    isLoading: socailAnaysisLoading,
  } = useGetSocialAnalysisQuery();

  if (hotKeywordsLoading || relatedKeywordsLoading || socailAnaysisLoading) {
    return <p>로딩중</p>;
  }

  return (
    <S.Wrapper>
      <SearchBar />

      <S.HotKeywordsWrapper>
        <HotKeywords type="day" ranking={hotKeywords!.day} />
        <HotKeywords type="week" ranking={hotKeywords!.week} />
      </S.HotKeywordsWrapper>

      <NoBookmark />

      <DailyAnalysis
        keyword="싸피"
        socialAnaysis={socialAnalysis!}
        relatedKeywords={relatedKeywords!}
      />
    </S.Wrapper>
  );
};

export default MainPage;
