/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSocialAnalysisQuery } from '@/apis/analyze';
import { useGetHotKeywordsQuery, useGetRelatedKeywordsQuery } from '@/apis/keyword';
import { SearchBar } from '@/components/molecules';
import { HotKeywords, NoBookmark, DailyAnalysis } from '@/components/organisms/MainPage';
import HotKeywordsSkeleton from '@/components/organisms/MainPage/HotKeywords/Skeleton';
import { ROUTER_PATH } from '@/constants/path';
import { useGetBookmarkQuery } from '@/apis/member';
import { getToken } from '@/utils/token';
import * as S from './index.styles';

const MainPage = () => {
  const token = getToken();
  const {
    data: bookmark,
    error: bookmarkError,
    isLoading: bookmarkLoading,
  } = useGetBookmarkQuery({ header: token! }, { skip: !token });

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
  } = useGetSocialAnalysisQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !bookmark,
  });

  const {
    data: relatedKeywords,
    error: relatedKeywordsError,
    isLoading: relatedKeywordsLoading,
  } = useGetRelatedKeywordsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !bookmark,
  });

  // 서치바
  const [value, setValue] = useState('');
  const navi = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navi(`/${ROUTER_PATH.SOCIAL_RESULT_PAGE}`, { state: { keyword: value } });
  };

  return (
    <S.Wrapper>
      <SearchBar
        placeholder="키워드를 입력하세요"
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {hotKeywordsLoading && (
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
