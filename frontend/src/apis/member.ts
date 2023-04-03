import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HeaderInterface } from '@/types/member';

const { VITE_API_URL: BASE_URL } = import.meta.env;
const port = window.location.href.split(':', 3)[2].substring(0, 4);

export const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: fetchBaseQuery({
    baseUrl: port === '6006' ? 'http://localhost:6006/member/' : `${BASE_URL}/member/`,
  }),
  tagTypes: ['bookmark'],
  endpoints: (builder) => ({
    getBookmark: builder.query<string | null, HeaderInterface>({
      query: (header) => ({ url: 'bookmark', header }),
      providesTags: ['bookmark'],
    }),
    postBookmark: builder.mutation<string | null, HeaderInterface>({
      query: (header) => ({ url: 'bookmark', method: 'POST', header }),
      invalidatesTags: ['bookmark'],
    }),
  }),
});

export const { useGetBookmarkQuery, usePostBookmarkMutation } = memberApi;
