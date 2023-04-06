import { Label } from '@/components/atoms';
import { BadgeType } from '@/components/atoms/Badge';
import { BadgeContent, RankingItem } from '@/components/molecules';
import { PALETTE } from '@/constants/palette';
import { RankingListItemInterface } from '@/types/ranking';
import { SocialAnalysisItemInterface } from '@/types/social';
import * as S from './index.styles';
import BarStackedChart from '@/components/molecules/BarStackedChart';

interface DailyAnalysisPropsInterface {
  keyword: string;
  socialAnalysis: Array<SocialAnalysisItemInterface>;
  relatedKeywords: Array<RankingListItemInterface>;
}

const DailyAnalysis = ({
  keyword,
  socialAnalysis,
  relatedKeywords,
}: DailyAnalysisPropsInterface) => {
  const todayInfo = socialAnalysis[6];
  const grapeBadgeProps = {
    count: `${todayInfo?.grapeQuotientInfo?.positive}%`,
    changed: `${todayInfo?.compareInfo?.grapeQuotient?.changed}%p`,
    type: `${todayInfo?.compareInfo?.grapeQuotient?.type}` as BadgeType,
    width: '120px',
  };
  const mentionBadgeProps = {
    count: `${todayInfo?.mentionCountInfo.total}건`,
    changed: `${todayInfo?.compareInfo.mention.changed}건`,
    type: `${todayInfo?.compareInfo.mention.type}` as BadgeType,
    width: '120px',
  };

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <Label color={PALETTE.BRAND400}>{keyword}&nbsp;</Label>
        <Label>일간분석</Label>
      </S.TitleWrapper>

      <S.ContentWrapper>
        <BarStackedChart
          labels={socialAnalysis?.map((item) => item.date.slice(5))}
          barNaverLabel="네이버 언급량"
          barNaverData={socialAnalysis?.map((item) => item.mentionCountInfo.naver)}
          barDaumLabel="다음 언급량"
          barDaumData={socialAnalysis?.map((item) => item.mentionCountInfo.daum)}
          lineLabel="포도알 지수 지수"
          lineData={socialAnalysis?.map((item) => Number(item.grapeQuotientInfo.grape.toFixed(2)))}
        />

        <S.BadgeWrapper>
          <BadgeContent type="grape" badge={grapeBadgeProps} />
          <BadgeContent type="mention" badge={mentionBadgeProps} />
        </S.BadgeWrapper>

        <S.RelatedWrapper>
          <Label>연관 키워드</Label>
          <S.RelatedPaper>
            <S.RelatedItemWrapper>
              {relatedKeywords.slice(0, 4).map((item) => (
                <RankingItem key={item.rank} {...item} width="8rem" />
              ))}
            </S.RelatedItemWrapper>
            <S.RelatedItemWrapper>
              {relatedKeywords.slice(-4).map((item) => (
                <RankingItem key={item.rank} {...item} width="8rem" />
              ))}
            </S.RelatedItemWrapper>
          </S.RelatedPaper>
        </S.RelatedWrapper>
      </S.ContentWrapper>
    </S.Wrapper>
  );
};

export default DailyAnalysis;
