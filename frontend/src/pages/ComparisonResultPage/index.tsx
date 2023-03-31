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
} from '@/pages/SocialResultPage/index.styles';
import { getSevenDaysAgoDate } from '@/utils/date';
import * as S from './index.styles';

const ComparisonResultPage = () => {
  // 키워드
  const location = useLocation();
  const { keyword1, keyword2 } = location.state;

  // 날짜
  const [startDate, setStartDate] = useState<Date | null>(getSevenDaysAgoDate());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

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

      <S.ChartsWrapper>
        <S.ChartWrapper>
          <Label>{keyword1}</Label>
          <BarChart barColor={PALETTE.RED400} desktopWidth="100%" />
        </S.ChartWrapper>
        <S.ChartWrapper>
          <Label>{keyword2}</Label>
          <BarChart barColor={PALETTE.BLUE400} desktopWidth="100%" />
        </S.ChartWrapper>
      </S.ChartsWrapper>
    </S.Wrapper>
  );
};

export default ComparisonResultPage;
