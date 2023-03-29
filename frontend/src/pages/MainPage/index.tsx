/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSocialAnalysisQuery } from '@/apis/analyze';
import { useGetHotKeywordQuery, useGetRelatedKeywordQuery } from '@/apis/keyword';
import { SearchBar } from '@/components/molecules';
import { HotKeywords, NoBookmark, DailyAnalysis } from '@/components/organisms/MainPage';
import HotKeywordsSkeleton from '@/components/organisms/MainPage/HotKeywords/Skeleton';
import { ROUTER_PATH } from '@/constants/path';
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

  const [value, setValue] = useState('');
  const navi = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navi(`/${ROUTER_PATH.SOCIAL_RESULT_PAGE}`, { state: { keyword: value } });
  };

  const { data: hotKeywords, error: hotKeywordsError } = useGetHotKeywordQuery();
  const { data: relatedKeywords, error: relatedKeywordsError } = useGetRelatedKeywordQuery();
  const { data: socialAnalysis, error: socialAnalysisError } = useGetSocialAnalysisQuery();

  return (
    <S.Wrapper>
      <SearchBar
        placeholder="키워드를 입력하세요"
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

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
