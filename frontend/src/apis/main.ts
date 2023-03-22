import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from '@/apis/utils/axios';
import { RankingListInterface } from '@/types/ranking';

// export const getHotKeywords = () => {
//   return api.get('/keyword/hot').then((res) => res.data);
// };

export const keywordApi = createApi({
  reducerPath: 'keywordApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/keyword/' }),
  tagTypes: ['get'],
  endpoints: (builder) => ({
    getHotKeyword: builder.query<RankingListInterface, string>({
      query: () => `hot`,
    }),
  }),
});

export const { useGetHotKeywordQuery } = keywordApi;
