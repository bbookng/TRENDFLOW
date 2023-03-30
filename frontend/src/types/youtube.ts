export interface YoutubeAnalysisInterface {
  video: {
    title: string;
    url: string;
    reaction: {
      viewCount: number;
      likeCount: number;
      commentCount: number;
    };
    affinityInfo: {
      positive: number;
      negative: number;
      neutral: number;
    };
    owner: {
      name: string;
      subscribeCount: number;
    };
  };
}

export interface YoutubeCommentInterface {
  id: number;
  upCount: number;
  downCount: number;
  comment: string;
}
