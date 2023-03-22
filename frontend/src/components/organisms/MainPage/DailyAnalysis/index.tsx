import { Label } from '@/components/atoms';
import { BadgeContent } from '@/components/molecules';
import { PALETTE } from '@/constants/palette';
import * as S from './index.styles';

const DailyAnalysis = () => {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <Label color={PALETTE.BRAND400}>삼성전자&nbsp;</Label>
        <Label>일간분석</Label>
      </S.TitleWrapper>

      <S.ContentWrapper>
        <S.ChartPaper />

        <S.BadgeWrapper>
          {/* <BadgeContent type="grape" />
          <BadgeContent type="mention" /> */}
        </S.BadgeWrapper>
      </S.ContentWrapper>
    </S.Wrapper>
  );
};

export default DailyAnalysis;
