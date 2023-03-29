import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SocialAnalysisItemInterface } from '@/types/social';
import { YoutubeAnalysisInterface } from '@/types/youtube';

const { VITE_API_URL: BASE_URL } = import.meta.env;
const port = window.location.href.split(':', 3)[2].substring(0, 4);

export const analyzeApi = createApi({
  reducerPath: 'analyzeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: port === '6006' ? 'http://localhost:6006/analyze/' : `${BASE_URL}/analyze/`,
  }),
  tagTypes: ['analyze'],
  endpoints: (builder) => ({
    getSocialAnalysis: builder.query<Array<SocialAnalysisItemInterface>, void>({
      query: () => `social`,
    }),
    getYoutubeAnalysis: builder.query<YoutubeAnalysisInterface, void>({
      query: (link) => ({
        url: 'youtube',
        method: 'POST',
        body: {
          link,
        },
      }),
    }),
  }),
});

export const { useGetSocialAnalysisQuery, useGetYoutubeAnalysisQuery } = analyzeApi;
