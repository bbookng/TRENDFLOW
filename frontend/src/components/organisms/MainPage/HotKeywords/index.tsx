import { Divider, Label } from '@/components/atoms';
import { CircleChart, RankingItem } from '@/components/molecules';
import { RankingListItemInterface } from '@/types/ranking';

import * as S from './index.styles';

type PeriodType = 'day' | 'week';

interface HotKeywordsPropsInterface {
  type: PeriodType;
  ranking: Array<RankingListItemInterface>;
}

const HotKeywords = ({ type, ranking }: HotKeywordsPropsInterface) => {
  const label = ranking.map((item) => item.keyword);
  const data = ranking.map((item) => item.mentionCount);

  return (
    <S.Wrapper>
      <Label>{type === 'day' ? '오늘의' : '이번 주'} HOT 키워드</Label>

      <S.ContentPaper>
        <S.ChartWrapper>
          <CircleChart width="240px" label={label} data={data} />
          <Divider type="solid" direction="vertical" width={0.1} length="100%" />
        </S.ChartWrapper>

        <S.RankingWrapper>
          <S.RankingItemWrapper>
            {ranking.slice(0, 4).map((item) => (
              <RankingItem key={item.rank} {...item} width="8rem" />
            ))}
          </S.RankingItemWrapper>
          <S.RankingItemWrapper>
            {ranking.slice(-4).map((item) => (
              <RankingItem key={item.rank} {...item} width="8rem" />
            ))}
          </S.RankingItemWrapper>
        </S.RankingWrapper>
      </S.ContentPaper>
    </S.Wrapper>
  );
};

export default HotKeywords;
