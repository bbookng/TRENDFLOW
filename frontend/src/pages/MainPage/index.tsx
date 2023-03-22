/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import * as S from './index.styles';
import SearchBar from '@/components/molecules/SearchBar';
import HotKeywords from '@/components/organisms/MainPage/HotKeywords';
import NoBookmark from '@/components/organisms/MainPage/NoBookmark';
import { RankChangeType } from '@/components/molecules/RankingItem';
import DailyAnalysis from '@/components/organisms/MainPage/DailyAnalysis';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { fetchTestData } from '@/store/slices/testSlice';
import { RankingListInterface } from '@/types/ranking';
import { useGetHotKeywordQuery } from '@/apis/main';

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

// 목업 데이터
const analysisData = {};

const MainPage = () => {
  const { data, error, isLoading } = useGetHotKeywordQuery('');
  console.log(data);

  // const dispatch = useAppDispatch();
  // const data = useAppSelector((state) => state.test.data);
  // useEffect(() => {
  //   dispatch(fetchTestData());
  //   console.log(data);
  // }, []);
  return (
    <S.Wrapper>
      <SearchBar />

      <S.HotKeywordsWrapper>
        <HotKeywords type="day" ranking={rankingList.day} />
        <HotKeywords type="week" ranking={rankingList.week} />
      </S.HotKeywordsWrapper>

      <NoBookmark />
      <DailyAnalysis />
    </S.Wrapper>
  );
};

export default MainPage;
