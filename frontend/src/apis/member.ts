import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostBookmarkReqInterface } from '../types/member';
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
      query: (req) => ({
        url: 'bookmark',
        prepareHeaders: (headers: any) => {
          headers.set('Authorization', req.Authorization);
          return headers;
        },
      }),
      providesTags: ['bookmark'],
    }),
    postBookmark: builder.mutation<string | null, PostBookmarkReqInterface>({
      query: ({ headers, params }) => ({
        url: 'bookmark',
        method: 'POST',
        headers,
        params,
      }),
      invalidatesTags: ['bookmark'],
    }),
  }),
});

export const { useGetBookmarkQuery, usePostBookmarkMutation } = memberApi;
