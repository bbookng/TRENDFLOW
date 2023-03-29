import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Datum } from 'react-d3-cloud/lib/WordCloud';
import { RankingListInterface, RankingListItemInterface } from '@/types/ranking';
import { RecommendKeywordInterface, WordCloudInterface } from '@/types/keyword';

const { VITE_API_URL: BASE_URL } = import.meta.env;
const port = window.location.href.split(':', 3)[2].substring(0, 4);

export const keywordApi = createApi({
  reducerPath: 'keywordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: port === '5173' ? `${BASE_URL}/keyword/` : 'http://localhost:6006/keyword/',
  }),
  tagTypes: ['hot', 'relate', 'recommend', 'wordcloud'],
  endpoints: (builder) => ({
    getHotKeywords: builder.query<RankingListInterface, void>({
      query: () => 'hot',
      providesTags: ['hot'],
    }),
    getRelatedKeywords: builder.query<Array<RankingListItemInterface>, void>({
      query: () => 'relate',
      providesTags: ['relate'],
    }),
    getRecommendKeyword: builder.query<RecommendKeywordInterface[], void>({
      query: () => 'recommend',
      provideTags: ['recommend'],
    }),
    getWordCloudKeyword: builder.query<Datum[], void>({
      query: () => `wordcloud`,
      provideTags: ['wordcloud'],
      keepUnusedDataFor: 1,
    }),
  }),
});

export const {
  useGetHotKeywordQuery,
  useGetRelatedKeywordQuery,
  useGetRecommendKeywordQuery,
  useGetWordCloudKeywordQuery,
} = keywordApi;
