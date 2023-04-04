export interface ComparisionAnalysisItemInterface {
  date: string;
  keyword1: number;
  keyword2: number;
  type: string;
  difference: number;
}

export interface ComparisonAnalysisInterface {
  grapeQuotientCompare: Array<ComparisionAnalysisItemInterface>;
  mentionCountCompare: Array<ComparisionAnalysisItemInterface>;
}

export interface ComaparisonReqBodyInterface {
  keyword1: string;
  keyword2: string;
  startDate: string;
  endDate: string;
}
