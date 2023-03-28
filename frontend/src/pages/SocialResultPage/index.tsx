/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import WordCloud from 'react-d3-cloud';
import { ko } from 'date-fns/esm/locale';
import { Typography } from '@/components/atoms';
import { SearchBar } from '@/components/molecules';
import * as S from './index.styles';
import { getSevenDaysAgoDate } from '@/utils/date';
import star from '@/assets/icons/star.svg';
import 'react-datepicker/dist/react-datepicker.css';
import BarChart from '@/components/molecules/BarChart';
import RelatedKeyword from '@/components/organisms/SocialResult/RelatedKeyword';
import TrendLineChart from '@/components/organisms/SocialResult/TrendLindChart';
import PostContents from '@/components/organisms/SocialResult/PostContents';
import { useGetWordCloudKeywordQuery } from '@/apis/keyword';

interface CustomInputInterface {
  value?: React.ReactNode;
  onClick?: () => void;
}

const SocialResultPage = () => {
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(getSevenDaysAgoDate());

  const CustomDataPicker = ({ value, onClick }: CustomInputInterface) => (
    <S.CustomDataPicker onClick={onClick}>{value}</S.CustomDataPicker>
  );

  const { data: wordCloudKeywords, isSuccess } = useGetWordCloudKeywordQuery();
  console.log(wordCloudKeywords);

  return (
    <>
      <S.TitleWrapper>
        <S.TypeWrapper>
          <Typography variant="H3">
            <S.HighLight>삼성전자</S.HighLight> 소셜 분석 리포트{' '}
          </Typography>
          {/* <S.Icon alt="즐겨찾기" src={star} width="27px" height="27px" /> */}
        </S.TypeWrapper>
        <SearchBar />
      </S.TitleWrapper>
      <S.DataSelectWrapper>
        <S.DateWrapper>
          <DatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<CustomDataPicker />}
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
            customInput={<CustomDataPicker />}
            minDate={startDate}
            maxDate={new Date()}
          />
        </S.DateWrapper>
      </S.DataSelectWrapper>

      <S.KeywordContentsWrapper>
        {/* 막대기 차트 */}
        <S.BarChartWrapper>
          <BarChart />
        </S.BarChartWrapper>
        {/* 워드 클라우드 */}
        <S.RelatedKeywordContentsWrapper>
          {isSuccess && <RelatedKeyword wordCloudKeywords={wordCloudKeywords} />}
        </S.RelatedKeywordContentsWrapper>
      </S.KeywordContentsWrapper>
      {/* 긍부정, 트렌드 LineChart */}
      <S.TrendChartContentsWrapper>
        <TrendLineChart text="긍부정 추이" />
        <TrendLineChart text="검색 엔진 트렌트 추이" />
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
