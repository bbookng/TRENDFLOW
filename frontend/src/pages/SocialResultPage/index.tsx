/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { Typography } from '@/components/atoms';
import { SearchBar } from '@/components/molecules';
import * as S from './index.styles';
import { getSevenDaysAgoDate } from '@/utils/date';
import 'react-datepicker/dist/react-datepicker.css';
import BarChart from '@/components/molecules/BarChart';
import RelatedKeyword from '@/components/organisms/SocialResult/RelatedKeyword';
import TrendLineChart from '@/components/organisms/SocialResult/TrendLindChart';
import PostContents from '@/components/organisms/SocialResult/PostContents';
import { useGetRelatedKeywordsQuery, useGetWordCloudKeywordsQuery } from '@/apis/keyword';
import CustomDatePicker from '@/components/organisms/SocialResult/CustomDatePicker';
import { useGetSocialAnalysisQuery } from '@/apis/analyze';

const SocialResultPage = () => {
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(getSevenDaysAgoDate());
  const [value, setValue] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 페이지 이동 필요 X 새로운 키워드를 가지고 api 다시 쏴서 데이터만 받으면 될듯
  };

  const { data: wordCloudKeywords, isSuccess: isWordCloudKeywordsSuccess } =
    useGetWordCloudKeywordsQuery();
  const { data: relatedKeywords, isSuccess: isRelatedKeywordsSuccess } =
    useGetRelatedKeywordsQuery();
  const { data: socialAnalysisData, isSuccess: isSocialAnalysisDataSuccess } =
    useGetSocialAnalysisQuery();

  console.log(socialAnalysisData);

  return (
    <>
      <S.TitleWrapper>
        <S.TypeWrapper>
          <Typography variant="H3">
            <S.HighLight>삼성전자</S.HighLight> 소셜 분석 리포트{' '}
          </Typography>
          {/* <S.Icon alt="즐겨찾기" src={star} width="27px" height="27px" /> */}
        </S.TypeWrapper>
        <SearchBar
          placeholder="키워드를 입력하세요"
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </S.TitleWrapper>
      <S.DateSelectWrapper>
        <S.DateWrapper>
          <DatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<CustomDatePicker />}
            minDate={new Date(2022, 8, 1)}
            maxDate={endDate}
          />
        </S.DateWrapper>
        <S.SpaceTypography variant="LARGE">~</S.SpaceTypography>
        <S.DateWrapper>
          <DatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            customInput={<CustomDatePicker />}
            minDate={startDate}
            maxDate={new Date()}
          />
        </S.DateWrapper>
      </S.DateSelectWrapper>

      <S.KeywordContentsWrapper>
        {/* 막대기 차트 */}
        <S.BarChartWrapper>
          <BarChart />
        </S.BarChartWrapper>
        {/* 워드 클라우드 */}
        <S.RelatedKeywordContentsWrapper>
          {isWordCloudKeywordsSuccess && isRelatedKeywordsSuccess && (
            <RelatedKeyword
              wordCloudKeywords={wordCloudKeywords}
              relatedKeywords={relatedKeywords}
            />
          )}
        </S.RelatedKeywordContentsWrapper>
      </S.KeywordContentsWrapper>
      {/* 긍부정, 트렌드 LineChart */}
      <S.TrendChartContentsWrapper>
        {isSocialAnalysisDataSuccess && (
          <>
            <TrendLineChart text="긍부정 추이" socialAnalysisData={socialAnalysisData} />
            <TrendLineChart text="검색 엔진 트렌트 추이" socialAnalysisData={socialAnalysisData} />
          </>
        )}
      </S.TrendChartContentsWrapper>

      <S.RelatedPostWrapper>
        <PostContents />
        <PostContents />
        <PostContents />
      </S.RelatedPostWrapper>
    </>
  );
};

export default SocialResultPage;
