import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SocialAnalysisItemInterface } from '@/types/social';

const { VITE_API_URL: BASE_URL } = import.meta.env;
const port = window.location.href.split(':', 3)[2].substring(0, 4);

export const analyzeApi = createApi({
  reducerPath: 'analyzeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: port === '5173' ? `${BASE_URL}/analyze/` : 'http://localhost:6006/analyze/',
  }),
  tagTypes: ['analyze'],
  endpoints: (builder) => ({
    getSocialAnalysis: builder.query<Array<SocialAnalysisItemInterface>, void>({
      query: () => `social`,
    }),
  }),
});

export const { useGetSocialAnalysisQuery } = analyzeApi;
