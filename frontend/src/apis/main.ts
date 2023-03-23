import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RankingListInterface } from '@/types/ranking';

export const keywordApi = createApi({
  reducerPath: 'keywordApi',
  // baseUrl은 .env로 관리하는 url 넣으면 될듯 ?
  baseQuery: fetchBaseQuery({ baseUrl: '/keyword/' }),
  tagTypes: ['get'],
  endpoints: (builder) => ({
    getHotKeyword: builder.query<RankingListInterface, void>({
      query: () => `hot`,
    }),
  }),
});

export const { useGetHotKeywordQuery } = keywordApi;
