/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useGetSocialAnalysisQuery } from '@/apis/analyze';
import { useGetHotKeywordsQuery, useGetRelatedKeywordsQuery } from '@/apis/keyword';
import { SearchBar } from '@/components/molecules';
import { HotKeywords, NoBookmark, DailyAnalysis } from '@/components/organisms/MainPage';
import HotKeywordsSkeleton from '@/components/organisms/MainPage/HotKeywords/Skeleton';
import { useGetBookmarkQuery } from '@/apis/member';
import { getToken } from '@/utils/token';
import { getDateToYYYYDDMM, getOneDaysAgoDate, getSevenDaysAgoDate } from '@/utils/date';
import { useAppDispatch } from '@/hooks/storeHook';
import { setHotKeyword } from '@/store/slices/keywordSlice';
import * as S from './index.styles';

const MainPage = () => {
  const token = getToken();
  // const dispatch = useAppDispatch();
  const {
    data: bookmark,
    error: bookmarkError,
    isLoading: bookmarkLoading,
    isSuccess: bookmarkSuccess,
  } = useGetBookmarkQuery(undefined, { refetchOnMountOrArgChange: true, skip: !token });

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
      keyword: bookmarkSuccess ? bookmark!.bookmark : '',
      startDate: getDateToYYYYDDMM(getSevenDaysAgoDate()),
      endDate: getDateToYYYYDDMM(getOneDaysAgoDate()),
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !bookmarkSuccess,
    }
  );

  const {
    data: relatedKeywords,
    error: relatedKeywordsError,
    isLoading: relatedKeywordsLoading,
  } = useGetRelatedKeywordsQuery(
    {
      keyword: bookmarkSuccess ? bookmark!.bookmark : '',
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !bookmarkSuccess,
    }
  );

  console.log('북마크', bookmark, bookmarkLoading, bookmarkError);
  console.log('소셜', socialAnalysis, socialAnalysisLoading, socialAnalysisError);
  console.log('연관 키워드', relatedKeywords, relatedKeywordsLoading, relatedKeywordsError);
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
          keyword={bookmark!.bookmark}
          socialAnalysis={socialAnalysis!}
          relatedKeywords={relatedKeywords!}
        />
      )}
    </S.Wrapper>
  );
};

export default MainPage;
