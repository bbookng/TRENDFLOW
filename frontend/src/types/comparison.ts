export interface ComparisonAnalysisInterface {
  grapeQuotientCompare: [
    {
      date: string;
      keyword1: number;
      keyword2: number;
      type: string;
      difference: number;
    }
  ];
  mentionCountCompare: [
    {
      date: string;
      keyword1: number;
      keyword2: number;
      type: string;
      difference: number;
    }
  ];
}

export interface ComaparisonReqBodyInterface {
  keyword1: string;
  keyword2: string;
  startDate: string;
  endDate: string;
}
