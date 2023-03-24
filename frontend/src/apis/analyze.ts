import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SocialAnalysisItemInterface } from '@/types/social';

const { VITE_API_URL: BASE_URL } = import.meta.env;

export const analyzeApi = createApi({
  reducerPath: 'analyzeApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/analyze/` }),
  tagTypes: ['get'],
  endpoints: (builder) => ({
    getSocialAnalysis: builder.query<Array<SocialAnalysisItemInterface>, void>({
      query: () => `social`,
    }),
  }),
});

export const { useGetSocialAnalysisQuery } = analyzeApi;
