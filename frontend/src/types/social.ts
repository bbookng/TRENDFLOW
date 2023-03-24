export interface SocialAnalysisItemInterface {
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
    mention: {
      type: string;
      changed: number;
    };
    grape: {
      type: string;
      changed: number;
    };
  };
}
