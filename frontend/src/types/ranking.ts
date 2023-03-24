import { RankChangeType } from '@/components/molecules/RankingItem';

export interface RankingListItemInterface {
  rank: number;
  keyword: string;
  type: RankChangeType;
  step?: number;
  mentionCount: number;
}

export interface RankingListInterface {
  day: Array<RankingListItemInterface>;
  week: Array<RankingListItemInterface>;
}
