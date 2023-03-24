import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RankingListInterface, RankingListItemInterface } from '@/types/ranking';

const { VITE_API_URL: BASE_URL } = import.meta.env;

export const keywordApi = createApi({
  reducerPath: 'keywordApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/keyword/` }),
  tagTypes: ['get'],
  endpoints: (builder) => ({
    getHotKeyword: builder.query<RankingListInterface, void>({
      query: () => `hot`,
    }),
    getRelatedKeyword: builder.query<Array<RankingListItemInterface>, void>({
      query: () => 'relate',
    }),
  }),
});

export const { useGetHotKeywordQuery, useGetRelatedKeywordQuery } = keywordApi;
