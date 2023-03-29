import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RankingListInterface, RankingListItemInterface } from '@/types/ranking';
import {
  CombineKeywordsInterface,
  RecommendKeywordInterface,
  WordCloudInterface,
} from '@/types/keyword';

const { VITE_API_URL: BASE_URL } = import.meta.env;

export const keywordApi = createApi({
  reducerPath: 'keywordApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/keyword/` }),
  endpoints: (builder) => ({
    getHotKeyword: builder.query<RankingListInterface, void>({
      query: () => `hot`,
    }),
    getRelatedKeyword: builder.query<Array<RankingListItemInterface>, void>({
      query: () => 'relate',
    }),
    getRecommendKeyword: builder.query<RecommendKeywordInterface[], void>({
      query: () => 'recommend',
    }),
    getWordCloudKeyword: builder.query<WordCloudInterface[], void>({
      query: () => `wordcloud`,
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
