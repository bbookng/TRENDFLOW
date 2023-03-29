import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RankingListInterface, RankingListItemInterface } from '@/types/ranking';
import {
  CombineKeywordsInterface,
  RecommendKeywordInterface,
  WordCloudInterface,
} from '@/types/keyword';

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
    getRecommendKeywords: builder.query<RecommendKeywordInterface[], void>({
      query: () => 'recommend',
      providesTags: ['recommend'],
    }),
    getWordCloudKeywords: builder.query<WordCloudInterface[], void>({
      query: () => `wordcloud`,
      providesTags: ['wordcloud'],
      keepUnusedDataFor: 1,
    }),
  }),
});

export const {
  useGetHotKeywordsQuery,
  useGetRelatedKeywordsQuery,
  useGetRecommendKeywordsQuery,
  useGetWordCloudKeywordsQuery,
} = keywordApi;
