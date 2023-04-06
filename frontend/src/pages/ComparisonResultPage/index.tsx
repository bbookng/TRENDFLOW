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
import { getDateToYYYYDDMM, getOneDaysAgoDate, getOneMonthAgoDate } from '@/utils/date';
import { useGetComparisonAnalysisQuery, useGetSocialAnalysisQuery } from '@/apis/analyze';
import ComparisonLineChart from '@/components/organisms/ComparisonResult/ComparisonLineChart';
import * as S from './index.styles';
import BarStackedChart from '@/components/molecules/BarStackedChart';

const ComparisonResultPage = () => {
  // 키워드
  const location = useLocation();
  const { keyword1, keyword2 } = location.state;

  // 날짜
  const [startDate, setStartDate] = useState<Date | null>(getOneMonthAgoDate());
  const [endDate, setEndDate] = useState<Date | null>(getOneDaysAgoDate());

  // 키워드1 소셜 분석
  const { data: keyword1SocialAnalysis, isSuccess: keyword1SocialAnalysisSuccess } =
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
  const { data: keyword2SocialAnalysis, isSuccess: keyword2SocialAnalysisSuccess } =
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
  const { data: comparisonAnalysis } = useGetComparisonAnalysisQuery(
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
  console.log(keyword2SocialAnalysis);
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
          <BarStackedChart
            labels={keyword1SocialAnalysis?.map((item) => item.date.slice(5))}
            barNaverLabel="네이버 언급량"
            barNaverData={keyword1SocialAnalysis?.map((item) => item.mentionCountInfo.naver)}
            barDaumLabel="다음 언급량"
            barDaumData={keyword1SocialAnalysis?.map((item) => item.mentionCountInfo.daum)}
            lineLabel="포도알 지수"
            lineData={keyword1SocialAnalysis?.map((item) =>
              Number(item.grapeQuotientInfo.grape.toFixed(2))
            )}
            desktopWidth="100%"
          />
        </S.ChartWrapper>
        <S.ChartWrapper>
          <Label>{keyword2}</Label>
          <BarStackedChart
            labels={keyword2SocialAnalysis?.map((item) => item.date.slice(5))}
            barNaverLabel="네이버 언급량"
            barNaverData={keyword2SocialAnalysis?.map((item) => item.mentionCountInfo.naver)}
            barDaumLabel="다음 언급량"
            barDaumData={keyword2SocialAnalysis?.map((item) => item.mentionCountInfo.daum)}
            lineLabel="포도알 지수"
            lineData={keyword2SocialAnalysis?.map((item) =>
              Number(item.grapeQuotientInfo.grape.toFixed(2))
            )}
            desktopWidth="100%"
          />
        </S.ChartWrapper>
      </S.ChartsWrapper>

      {/* 꺾은선 차트 */}
      {comparisonAnalysis && (
        <TrendChartContentsWrapper>
          <ComparisonLineChart
            title="포도알 지수 비교"
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
