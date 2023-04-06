/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useGetSocialAnalysisQuery } from '@/apis/analyze';
import { useGetHotKeywordsQuery, useGetRelatedKeywordsQuery } from '@/apis/keyword';
import { SearchBar } from '@/components/molecules';
import { HotKeywords, NoBookmark, DailyAnalysis } from '@/components/organisms/MainPage';
import HotKeywordsSkeleton from '@/components/organisms/MainPage/HotKeywords/Skeleton';
import { useGetBookmarkQuery } from '@/apis/member';
import { getToken } from '@/utils/token';
import { getDateToYYYYDDMM, getSevenDaysAgoDate } from '@/utils/date';
import { useAppDispatch } from '@/hooks/storeHook';
import { setHotKeyword } from '@/store/slices/keywordSlice';
import * as S from './index.styles';

const MainPage = () => {
  const token = getToken();
  const dispatch = useAppDispatch();
  const {
    data: bookmark,
    error: bookmarkError,
    isLoading: bookmarkLoading,
  } = useGetBookmarkQuery(undefined, { skip: !token });

  const {
    data: hotKeywords,
    error: hotKeywordsError,
    isLoading: hotKeywordsLoading,
  } = useGetHotKeywordsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: socialAnalysis,
    error: socialAnalysisError,
    isLoading: socialAnalysisLoading,
  } = useGetSocialAnalysisQuery(
    {
      keyword: bookmark!,
      startDate: getDateToYYYYDDMM(getSevenDaysAgoDate()),
      endDate: getDateToYYYYDDMM(new Date()),
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !bookmark,
    }
  );

  const {
    data: relatedKeywords,
    error: relatedKeywordsError,
    isLoading: relatedKeywordsLoading,
  } = useGetRelatedKeywordsQuery(
    {
      keyword: bookmark!,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !bookmark,
    }
  );
  // useEffect(() => {
  //   dispatch(setHotKeyword(hotKeywords?.week[0].keyword));
  // }, [hotKeywords]);
  return (
    <S.Wrapper>
      <SearchBar placeholder="키워드를 입력하세요" />

      {hotKeywordsLoading && (
        <S.HotKeywordsWrapper>
          <HotKeywordsSkeleton />
          <HotKeywordsSkeleton />
        </S.HotKeywordsWrapper>
      )}

      {hotKeywords && (
        <S.HotKeywordsWrapper>
          <HotKeywords type="day" ranking={hotKeywords?.day} />
          <HotKeywords type="week" ranking={hotKeywords?.week} />
        </S.HotKeywordsWrapper>
      )}

      {!token && !bookmark && <NoBookmark />}

      {socialAnalysis && relatedKeywords && (
        <DailyAnalysis
          keyword={bookmark!}
          socialAnalysis={socialAnalysis!}
          relatedKeywords={relatedKeywords!}
        />
      )}
    </S.Wrapper>
  );
};

export default MainPage;
