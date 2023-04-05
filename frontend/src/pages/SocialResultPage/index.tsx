/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetSocialAnalysisQuery } from '@/apis/analyze';
import { useGetRelatedKeywordsQuery, useGetWordCloudKeywordsQuery } from '@/apis/keyword';
import { useGetBookmarkQuery, usePostBookmarkMutation } from '@/apis/member';
import { Star, StarFill } from '@/assets';
import { Typography } from '@/components/atoms';
import { SearchBar, BarChart } from '@/components/molecules';
import RelatedKeyword from '@/components/organisms/SocialResult/RelatedKeyword';
import TrendLineChart from '@/components/organisms/SocialResult/TrendLindChart';
import CustomDatePicker from '@/components/organisms/SocialResult/CustomDatePicker';
import SocialRelatedContents from '@/components/organisms/SocialResult/SocialRelatedContents';
import { getDateToYYYYDDMM, getSevenDaysAgoDate } from '@/utils/date';
import { getToken } from '@/utils/token';
import * as S from './index.styles';

const SocialResultPage = () => {
  const token = getToken();
  const {
    data: bookmark,
    error: bookmarkError,
    isLoading: bookmarkLoading,
  } = useGetBookmarkQuery({ token: token! }, { skip: !token });

  const {
    state: { keyword },
  } = useLocation();

  const [isBookmarked, setIsBookmarked] = useState(bookmark === keyword);

  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(getSevenDaysAgoDate());

  const { data: wordCloudKeywords, isSuccess: isWordCloudKeywordsSuccess } =
    useGetWordCloudKeywordsQuery(
      { keyword },
      {
        refetchOnMountOrArgChange: true,
        skip: !keyword,
      }
    );

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

  const [postBookmark] = usePostBookmarkMutation();

  const handleBookmarkBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const req = {
      header: { token: token! },
      params: { keyword: keyword! },
    };
    postBookmark(req);
    setIsBookmarked((prev) => !prev);
  };

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.TypeWrapper>
          <Typography variant="H3">
            <S.HighLight>{keyword}</S.HighLight> 소셜 분석 리포트
          </Typography>
          {/* 북마크 */}
          <S.BookmarkBtn onClick={handleBookmarkBtn}>
            {isBookmarked ? <StarFill /> : <Star />}
          </S.BookmarkBtn>
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
          <BarChart
            labels={socialAnalysisData?.map((item) => item.date.slice(5))}
            barLabel="언급량"
            barData={socialAnalysisData?.map((item) => item.mentionCountInfo.total)}
            lineLabel="피치 지수"
            lineData={socialAnalysisData?.map((item) => item.grapeQuotientInfo.positive)}
          />
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
