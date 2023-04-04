import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ComparisonAnalysisInterface, ComaparisonReqBodyInterface } from '../types/comparison';
import { SocialAnalysisItemInterface, SocialReqBodyInterface } from '@/types/social';
import {
  YoutubeAnalysisInterface,
  YoutubeCommentInterface,
  YoutubeCommentQueryProps,
} from '@/types/youtube';

const { VITE_API_URL: BASE_URL } = import.meta.env;
const port = window.location.href.split(':', 3)[2].substring(0, 4);

export const analyzeApi = createApi({
  reducerPath: 'analyzeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: port === '6006' ? 'http://localhost:6006/analyze/' : `${BASE_URL}/analyze/`,
  }),
  tagTypes: ['analyze'],
  endpoints: (builder) => ({
    getSocialAnalysis: builder.query<Array<SocialAnalysisItemInterface>, SocialReqBodyInterface>({
      query: (info) => ({ url: 'social', body: info }),
    }),
    getYoutubeAnalysis: builder.query<YoutubeAnalysisInterface, string>({
      query: (link) => `youtube?link=${encodeURIComponent(link)}`,
    }),
    getYoutubeCommentAnalysis: builder.query<
      Array<YoutubeCommentInterface>,
      YoutubeCommentQueryProps
    >({
      query: (data) => {
        const { link, code, page, perPage } = data;
        return `youtube/comment?link=${encodeURIComponent(
          link
        )}&code=${code}&page=${page}&perPage=${perPage}`;
      },
    }),
    getComparisionAnalysis: builder.query<ComparisonAnalysisInterface, ComaparisonReqBodyInterface>(
      {
        query: (info) => ({ url: 'social', body: info }),
      }
    ),
  }),
});

export const {
  useGetSocialAnalysisQuery,
  useGetYoutubeAnalysisQuery,
  useGetYoutubeCommentAnalysisQuery,
  useGetComparisionAnalysisQuery,
} = analyzeApi;
