/* eslint-disable react-hooks/exhaustive-deps */
import { useGetSocialAnalysisQuery } from '@/apis/analyze';
import { useGetHotKeywordQuery, useGetRelatedKeywordQuery } from '@/apis/keyword';
import { SearchBar } from '@/components/molecules';
import LineChart from '@/components/molecules/LineChart';
import { HotKeywords, NoBookmark, DailyAnalysis } from '@/components/organisms/MainPage';
import HotKeywordsSkeleton from '@/components/organisms/MainPage/HotKeywords/Skeleton';
import * as S from './index.styles';

const MainPage = () => {
  const { data: hotKeywords, error: hotKeywordsError } = useGetHotKeywordQuery();

  const { data: relatedKeywords, error: relatedKeywordsError } = useGetRelatedKeywordQuery();

  const { data: socialAnalysis, error: socialAnalysisError } = useGetSocialAnalysisQuery();

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
