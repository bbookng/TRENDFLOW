/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSocialAnalysisQuery } from '@/apis/analyze';
import { useGetHotKeywordsQuery, useGetRelatedKeywordsQuery } from '@/apis/keyword';
import { SearchBar } from '@/components/molecules';
import { HotKeywords, NoBookmark, DailyAnalysis } from '@/components/organisms/MainPage';
import HotKeywordsSkeleton from '@/components/organisms/MainPage/HotKeywords/Skeleton';
import { useAppSelector } from '@/hooks/storeHook';
import * as S from './index.styles';

const MainPage = () => {
  // 🍇 튜토리얼 구현 시 주석 해제
  // const navi = useNavigate();
  // const { guide } = useAppSelector((state) => state);

  // useEffect(() => {
  //   if (guide.main) {
  //     navi('/social');
  //   }
  // }, []);

  const { data: hotKeywords, error: hotKeywordsError } = useGetHotKeywordsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: relatedKeywords, error: relatedKeywordsError } = useGetRelatedKeywordsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: socialAnalysis, error: socialAnalysisError } = useGetSocialAnalysisQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <S.Wrapper>
      <SearchBar />

      {!hotKeywords && (
        <S.HotKeywordsWrapper>
          <HotKeywordsSkeleton />
          <HotKeywordsSkeleton />
        </S.HotKeywordsWrapper>
      )}

      {hotKeywords && (
        <S.HotKeywordsWrapper>
          <HotKeywords type="day" ranking={hotKeywords!.day} />
          <HotKeywords type="week" ranking={hotKeywords!.week} />
        </S.HotKeywordsWrapper>
      )}

      <NoBookmark />

      {socialAnalysis && relatedKeywords && (
        <DailyAnalysis
          keyword="싸피"
          socialAnaysis={socialAnalysis!}
          relatedKeywords={relatedKeywords!}
        />
      )}
    </S.Wrapper>
  );
};

export default MainPage;
