import { rest } from 'msw';
import { hot, relate, social, recommend, wordCloud } from '@/mocks/data';

const { VITE_API_URL: BASE_URL } = import.meta.env;

export const handlers = [
  // 키워드
  rest.get(`${BASE_URL}/keyword/hot`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(hot));
  }),

  rest.get(`${BASE_URL}/keyword/relate`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(relate));
  }),

  rest.get('/keyword/recommend', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(recommend));
  }),

  // 워드 클라우드
  rest.get('/keyword/wordcloud', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(wordCloud));
  }),

  // 분석
  rest.get(`${BASE_URL}/analyze/social`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(social));
  }),

  rest.post(`${BASE_URL}/member/login`, (req, res, ctx) => {
    return res(ctx.status(500));
  }),

  // 유튜브
];
