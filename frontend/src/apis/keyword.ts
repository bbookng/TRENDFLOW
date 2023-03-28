import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RankingListInterface, RankingListItemInterface } from '@/types/ranking';

const { VITE_API_URL: BASE_URL } = import.meta.env;
const port = window.location.href.split(':', 3)[2].substring(0, 4);

export const keywordApi = createApi({
  reducerPath: 'keywordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: port === '5173' ? `${BASE_URL}/keyword/` : 'http://localhost:6006/keyword/',
  }),
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
