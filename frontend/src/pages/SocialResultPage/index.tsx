/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import { useLocation } from 'react-router-dom';
import { Typography } from '@/components/atoms';
import { SearchBar } from '@/components/molecules';
import { getDateToYYYYDDMM, getSevenDaysAgoDate } from '@/utils/date';
import 'react-datepicker/dist/react-datepicker.css';
import BarChart from '@/components/molecules/BarChart';
import RelatedKeyword from '@/components/organisms/SocialResult/RelatedKeyword';
import TrendLineChart from '@/components/organisms/SocialResult/TrendLindChart';
import { useGetRelatedKeywordsQuery, useGetWordCloudKeywordsQuery } from '@/apis/keyword';
import CustomDatePicker from '@/components/organisms/SocialResult/CustomDatePicker';
import { useGetSocialAnalysisQuery } from '@/apis/analyze';
import * as S from './index.styles';
import SocialRelatedContents from '@/components/organisms/SocialResult/SocialRelatedContents';

const SocialResultPage = () => {
  const {
    state: { keyword },
  } = useLocation();

  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(getSevenDaysAgoDate());

  const { data: wordCloudKeywords, isSuccess: isWordCloudKeywordsSuccess } =
    useGetWordCloudKeywordsQuery();
  const { data: relatedKeywords, isSuccess: isRelatedKeywordsSuccess } = useGetRelatedKeywordsQuery(
    { keyword },
    {
      refetchOnMountOrArgChange: true,
      skip: !keyword,
    }
  );
  const { data: socialAnalysisData, isSuccess: isSocialAnalysisDataSuccess } =
    useGetSocialAnalysisQuery(
      {
        keyword,
        startDate: getDateToYYYYDDMM(startDate!),
        endDate: getDateToYYYYDDMM(endDate!),
      },
      {
        refetchOnMountOrArgChange: true,
        skip: !keyword,
      }
    );
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.TypeWrapper>
          <Typography variant="H3">
            <S.HighLight>{keyword}</S.HighLight> 소셜 분석 리포트
          </Typography>
          {/* <S.Icon alt="즐겨찾기" src={star} width="27px" height="27px" /> */}
        </S.TypeWrapper>
        <SearchBar placeholder="키워드를 입력하세요" searched={keyword} />
      </S.TitleWrapper>

      <S.DateSelectWrapper>
        <S.DateWrapper>
          <DatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={(date) => setStartDate(date!)}
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
            onChange={(date) => setEndDate(date!)}
            customInput={<CustomDatePicker />}
            minDate={startDate}
            maxDate={new Date()}
          />
        </S.DateWrapper>
      </S.DateSelectWrapper>

      <S.KeywordContentsWrapper>
        {/* 막대기 차트 */}
        <S.ChartWrapper>
          <S.Title>분석 그래프</S.Title>
          <BarChart />
        </S.ChartWrapper>

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
      <S.FlexBox>
        <S.TrendChartContentsWrapper>
          {isSocialAnalysisDataSuccess && (
            <TrendLineChart text="긍부정 추이" socialAnalysisData={socialAnalysisData} />
          )}
        </S.TrendChartContentsWrapper>
        <SocialRelatedContents
          keyword={keyword}
          startDate={getDateToYYYYDDMM(startDate as Date)}
          endDate={getDateToYYYYDDMM(endDate as Date)}
        />
      </S.FlexBox>
    </S.Wrapper>
  );
};

export default SocialResultPage;
