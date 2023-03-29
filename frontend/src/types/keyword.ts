import { RankingListItemInterface } from '@/types/ranking';

export interface RecommendKeywordInterface {
  id: string;
  keyword: string;
}

export interface WordCloudInterface {
  text: string;
  value: number;
}

export interface CombineKeywordsInterface {
  relatedKeywords: RankingListItemInterface[];
  wordCloudKeywords: WordCloudInterface[];
}
