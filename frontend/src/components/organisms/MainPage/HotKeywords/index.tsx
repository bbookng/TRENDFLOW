import { Typography, Paper, Divider, Label } from '@/components/atoms';
import { RankingItem } from '@/components/molecules';
import { RankChangeType } from '@/components/molecules/RankingItem';
import * as S from './index.styles';

type PeriodType = 'day' | 'week';

interface HotKeywordsPropsInterface {
  type: PeriodType;
}

interface RankingListItemInterface {
  rank: number;
  keyword: string;
  type: RankChangeType;
  step?: number;
}

// 목업 데이터
const RankingList: Array<RankingListItemInterface> = [
  {
    rank: 1,
    keyword: '싸피',
    type: 'up',
    step: 2,
  },
  {
    rank: 2,
    keyword: '삼성전자',
    type: 'down',
    step: 1,
  },
  {
    rank: 3,
    keyword: '삼성전기',
    type: 'new',
  },
  {
    rank: 4,
    keyword: '신세계',
    type: 'same',
  },
  {
    rank: 5,
    keyword: '호텔신라',
    type: 'up',
    step: 3,
  },
  {
    rank: 6,
    keyword: '삼성SDS',
    type: 'up',
    step: 1,
  },
  {
    rank: 7,
    keyword: '삼성SDI',
    type: 'down',
    step: 1,
  },
  {
    rank: 8,
    keyword: '삼성전자',
    type: 'new',
  },
];

const HotKeywords = ({ type }: HotKeywordsPropsInterface) => {
  return (
    <S.Wrapper>
      <Label>{type === 'day' ? '오늘의' : '이번 주'} HOT 키워드</Label>

      <Paper>
        <S.TempChart />
        {/* <Divider type="solid" direction="vertical" width={0.8} /> */}

        <S.MobileRankingWrapper>
          <S.Wrapper>
            {RankingList.slice(0, 4).map((item) => (
              <RankingItem key={item.rank} {...item} width="120px" />
            ))}
          </S.Wrapper>
          <S.Wrapper>
            {RankingList.slice(-4).map((item) => (
              <RankingItem key={item.rank} {...item} width="120px" />
            ))}
          </S.Wrapper>
        </S.MobileRankingWrapper>
      </Paper>
    </S.Wrapper>
  );
};

export default HotKeywords;
