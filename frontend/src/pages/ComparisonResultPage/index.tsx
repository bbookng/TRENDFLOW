import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { PALETTE } from '@/constants/palette';
import { Label, Typography } from '@/components/atoms';
import { BarChart, CompareSearchBar } from '@/components/molecules';
import CustomDatePicker from '@/components/organisms/SocialResult/CustomDatePicker';
import {
  DateSelectWrapper,
  DateWrapper,
  HighLight,
  SpaceTypography,
  TrendChartContentsWrapper,
} from '@/pages/SocialResultPage/index.styles';
import { getDateToYYYYDDMM, getSevenDaysAgoDate } from '@/utils/date';
import { useGetComparisionAnalysisQuery, useGetSocialAnalysisQuery } from '@/apis/analyze';
import ComparisonLineChart from '@/components/organisms/ComparisonResult/ComparisonLineChart';
import * as S from './index.styles';

const ComparisonResultPage = () => {
  // 키워드
  const location = useLocation();
  const { keyword1, keyword2 } = location.state;

  // 날짜
  const [startDate, setStartDate] = useState<Date | null>(getSevenDaysAgoDate());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // 키워드1 소셜 분석
  const { data: keyword1SocialAnalysis, isSuccess: keyword1SocialAnaysisSuccess } =
    useGetSocialAnalysisQuery(
      {
        keyword: keyword1,
        startDate: getDateToYYYYDDMM(startDate!),
        endDate: getDateToYYYYDDMM(endDate!),
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  // 키워드2 소셜 분석
  const { data: keyword2SocialAnalysis, isSuccess: keyword2SocialAnaysisSuccess } =
    useGetSocialAnalysisQuery(
      {
        keyword: keyword2,
        startDate: getDateToYYYYDDMM(startDate!),
        endDate: getDateToYYYYDDMM(endDate!),
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  // 비교 분석
  const { data: comparisonAnalysis } = useGetComparisionAnalysisQuery(
    {
      keyword1,
      keyword2,
      startDate: getDateToYYYYDDMM(startDate!),
      endDate: getDateToYYYYDDMM(endDate!),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <CompareSearchBar keywords={[keyword1, keyword2]} />
        <S.TitleTextWrapper>
          <Typography variant="H2">
            <HighLight>{keyword1}</HighLight> vs <HighLight>{keyword2}</HighLight>
          </Typography>
          <Typography variant="H2">비교 분석 레포트</Typography>
        </S.TitleTextWrapper>
      </S.TitleWrapper>

      <DateSelectWrapper>
        {/* 시작 날짜 */}
        <DateWrapper>
          <DatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<CustomDatePicker />}
            minDate={new Date(2022, 8, 1)}
            maxDate={endDate}
          />
        </DateWrapper>
        <SpaceTypography variant="LARGE">~</SpaceTypography>
        {/* 끝 날짜 */}
        <DateWrapper>
          <DatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            customInput={<CustomDatePicker />}
            minDate={startDate}
            maxDate={new Date()}
          />
        </DateWrapper>
      </DateSelectWrapper>

      {/* 막대 차트 */}
      <S.ChartsWrapper>
        <S.ChartWrapper>
          <Label>{keyword1}</Label>
          <BarChart
            labels={keyword1SocialAnalysis?.map((item) => item.date.slice(5))}
            barLabel="언급량"
            barData={keyword1SocialAnalysis?.map((item) => item.mentionCountInfo.total)}
            lineLabel="피치 지수"
            lineData={keyword2SocialAnalysis?.map((item) => item.grapeQuotientInfo.positive)}
            barColor={PALETTE.RED400}
            desktopWidth="100%"
          />
        </S.ChartWrapper>
        <S.ChartWrapper>
          <Label>{keyword2}</Label>
          <BarChart
            labels={keyword1SocialAnalysis?.map((item) => item.date.slice(5))}
            barLabel="언급량"
            barData={keyword1SocialAnalysis?.map((item) => item.mentionCountInfo.total)}
            lineLabel="피치 지수"
            lineData={keyword2SocialAnalysis?.map((item) => item.grapeQuotientInfo.positive)}
            barColor={PALETTE.BLUE400}
            desktopWidth="100%"
          />
        </S.ChartWrapper>
      </S.ChartsWrapper>

      {/* 꺾은선 차트 */}
      {comparisonAnalysis && (
        <TrendChartContentsWrapper>
          <ComparisonLineChart
            title="피치 지수 비교"
            keyword1={keyword1}
            keyword2={keyword2}
            comparisonData={comparisonAnalysis!.grapeQuotientCompare}
          />
          <ComparisonLineChart
            title="언급량 비교"
            keyword1={keyword1}
            keyword2={keyword2}
            comparisonData={comparisonAnalysis!.mentionCountCompare}
          />
        </TrendChartContentsWrapper>
      )}
    </S.Wrapper>
  );
};

export default ComparisonResultPage;
