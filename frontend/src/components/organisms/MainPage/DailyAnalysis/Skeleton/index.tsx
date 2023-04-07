/* eslint-disable react/no-array-index-key */
import { Label } from '@/components/atoms';
import * as S from './index.styles';
import ChartSkeleton from '@/components/molecules/BarStackedChart/Skeleton';
import BadgeContentSkeleton from '@/components/molecules/BadgeContent/Skeleton';
import { RankingItemSkeleton } from '@/components/molecules/RankingItem/Skeleton/index.styles';
import { PALETTE } from '@/constants/palette';

interface DailyAnalysisPropsInterface {
  keyword: string;
}

const DailyAnalysisSkeleton = ({ keyword }: DailyAnalysisPropsInterface) => {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <Label color={PALETTE.BRAND400}>{keyword}&nbsp;</Label>
        <Label>일간분석</Label>
      </S.TitleWrapper>

      <S.ContentWrapper>
        <ChartSkeleton />

        <S.BadgeWrapper>
          <BadgeContentSkeleton type="grape" />
          <BadgeContentSkeleton type="mention" />
        </S.BadgeWrapper>

        <S.RelatedWrapper>
          <Label>연관 키워드</Label>
          <S.RelatedPaper>
            <S.RelatedItemWrapper>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <RankingItemSkeleton key={index} width="8rem" />
                ))}
            </S.RelatedItemWrapper>
            <S.RelatedItemWrapper>
              {Array(4)
                .fill(0)
                .slice(-4)
                .map((_, index) => (
                  <RankingItemSkeleton key={index} width="8rem" />
                ))}
            </S.RelatedItemWrapper>
          </S.RelatedPaper>
        </S.RelatedWrapper>
      </S.ContentWrapper>
    </S.Wrapper>
  );
};

export default DailyAnalysisSkeleton;
