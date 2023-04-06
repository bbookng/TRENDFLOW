import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostBookmarkReqInterface } from '@/types/member';
import { getToken } from '@/utils/token';

const { VITE_API_URL: BASE_URL } = import.meta.env;
const port = window.location.href.split(':', 3)[2].substring(0, 4);

export const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: fetchBaseQuery({
    baseUrl: port === '6006' ? 'http://localhost:6006/member/' : `${BASE_URL}/member/`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = getToken();
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['bookmark'],
  endpoints: (builder) => ({
    getBookmark: builder.query<{ bookmark: string } | null, void>({
      query: () => 'bookmark',
      providesTags: ['bookmark'],
    }),
    postBookmark: builder.mutation<{ bookmark: string } | null, Partial<PostBookmarkReqInterface>>({
      query: ({ keyword }) => {
        return {
          url: 'bookmark',
          method: 'POST',
          body: { keyword },
        };
      },
      invalidatesTags: ['bookmark'],
    }),
  }),
});

export const { useGetBookmarkQuery, usePostBookmarkMutation } = memberApi;
