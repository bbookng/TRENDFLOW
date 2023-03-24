import { Label } from '@/components/atoms';
import { BadgeContent, RankingItem } from '@/components/molecules';
import BarChart from '@/components/molecules/BarChart';
import { PALETTE } from '@/constants/palette';
import { RankingListItemInterface } from '@/types/ranking';
import * as S from './index.styles';

// 목업 데이터
const relatedKeywords: Array<RankingListItemInterface> = [
  {
    rank: 1,
    keyword: '싸피',
    type: 'up',
    step: 2,
    mentionCount: 2023,
  },
  {
    rank: 2,
    keyword: '삼성전자',
    type: 'down',
    step: 1,
    mentionCount: 1823,
  },
  {
    rank: 3,
    keyword: '삼성전기',
    type: 'new',
    mentionCount: 1623,
  },
  {
    rank: 4,
    keyword: '신세계',
    type: 'same',
    mentionCount: 1423,
  },
  {
    rank: 5,
    keyword: '호텔신라',
    type: 'up',
    step: 3,
    mentionCount: 1223,
  },
  {
    rank: 6,
    keyword: '삼성SDS',
    type: 'up',
    step: 1,
    mentionCount: 1023,
  },
  {
    rank: 7,
    keyword: '삼성SDI',
    type: 'down',
    step: 1,
    mentionCount: 823,
  },
  {
    rank: 8,
    keyword: '삼성전자',
    type: 'new',
    mentionCount: 623,
  },
];

// TODO🍇 RTK 쿼리 완료되면 BadgeContent, RelatedItem Props 수정 후 마무리
const DailyAnalysis = () => {
  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <Label color={PALETTE.BRAND400}>삼성전자&nbsp;</Label>
        <Label>일간분석</Label>
      </S.TitleWrapper>

      <S.ContentWrapper>
        <BarChart />

        <S.BadgeWrapper>
          {/* <BadgeContent type="grape" />
          <BadgeContent type="mention" /> */}
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
