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

export interface SocialAnalysisDataInterface {
  date: string;
  mentionCountInfo: {
    total: number;
    daum: number;
    naver: number;
    twitter: number;
  };
  grapeQuotientInfo: {
    positive: number;
    negative: number;
    neutral: number;
  };
  compareInfo: {
    mentionCount: number;
    mentionCountType: string;
    grapeQuotient: number;
    grapeQuotientType: string;
  };
}
