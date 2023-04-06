/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGetSocialAnalysisQuery } from '@/apis/analyze';
import { useGetWordCloudKeywordsQuery } from '@/apis/keyword';
import { useGetBookmarkQuery, usePostBookmarkMutation } from '@/apis/member';
import { Star, StarFill } from '@/assets';
import { Typography } from '@/components/atoms';
import { SearchBar } from '@/components/molecules';
import RelatedKeyword from '@/components/organisms/SocialResult/RelatedKeyword';
import TrendLineChart from '@/components/organisms/SocialResult/TrendLindChart';
import CustomDatePicker from '@/components/organisms/SocialResult/CustomDatePicker';
import SocialRelatedContents from '@/components/organisms/SocialResult/SocialRelatedContents';
import { getDateToYYYYDDMM, getOneMonthAgoDate, getOneDaysAgoDate } from '@/utils/date';
import { getToken } from '@/utils/token';
import { useAppSelector, useAppDispatch } from '@/hooks/storeHook';
import { showToast } from '@/store/slices/toastSlice';
import * as S from './index.styles';
import BarStackedChart from '@/components/molecules/BarStackedChart';

const SocialResultPage = () => {
  const token = getToken();
  const {
    state: { keyword },
  } = useLocation();

  const {
    data: bookmark,
    error: bookmarkError,
    isLoading: bookmarkLoading,
  } = useGetBookmarkQuery(undefined, { refetchOnMountOrArgChange: false, skip: !token });

  const {
    user: { isLoggedIn },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [isBookmarked, setIsBookmarked] = useState(bookmark?.bookmark === keyword);

  const [endDate, setEndDate] = useState<Date>(getOneDaysAgoDate());
  const [startDate, setStartDate] = useState<Date>(getOneMonthAgoDate());

  const { data: wordCloudKeywords, isSuccess: isWordCloudKeywordsSuccess } =
    useGetWordCloudKeywordsQuery(
      { keyword },
      {
        refetchOnMountOrArgChange: false,
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
        refetchOnMountOrArgChange: false,
        skip: !keyword,
      }
    );

  const [postBookmark] = usePostBookmarkMutation();

  const handleBookmarkBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoggedIn) {
      dispatch(showToast('💥 로그인이 필요합니다.'));
      return;
    }
    postBookmark({ keyword: keyword! });
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
          <BarStackedChart
            labels={socialAnalysisData?.map((item) => item.date.slice(5))}
            barNaverLabel="네이버 언급량"
            barNaverData={socialAnalysisData?.map((item) => item.mentionCountInfo.naver)}
            barDaumLabel="다음 언급량"
            barDaumData={socialAnalysisData?.map((item) => item.mentionCountInfo.daum)}
            lineLabel="포도알 지수"
            lineData={socialAnalysisData?.map((item) =>
              Number(item.grapeQuotientInfo.grape.toFixed(2))
            )}
          />
        </S.ChartWrapper>

        {/* 워드 클라우드 */}
        <S.RelatedKeywordContentsWrapper>
          {isWordCloudKeywordsSuccess && <RelatedKeyword wordCloudKeywords={wordCloudKeywords} />}
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
