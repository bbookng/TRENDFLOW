import { rest } from 'msw';
import {
  hot,
  pComment,
  relate,
  social,
  youtube,
  recommend,
  wordCloud,
  bookmark,
} from '@/mocks/data';

const { VITE_API_URL: BASE_URL } = import.meta.env;

export const handlers = [
  // 키워드
  rest.get(`${BASE_URL}/keyword/hot`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(hot));
  }),

  rest.get(`${BASE_URL}/keyword/relate`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(relate));
  }),

  rest.get(`${BASE_URL}/keyword/recommend`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(recommend));
  }),

  // 워드 클라우드
  rest.get(`${BASE_URL}/keyword/wordcloud`, (req, res, ctx) => {
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

  rest.get(
    `${BASE_URL}/analyze/youtube?link=${encodeURIComponent(
      'https://www.youtube.com/watch?v=N7kvgJvxcsw'
    )}`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(youtube));
    }
  ),

  rest.get(`${BASE_URL}/analyze/youtube/comment`, (req, res, ctx) => {
    const page: number = parseInt(req.url.searchParams.get('page') as string, 10);
    const perPage: number = parseInt(req.url.searchParams.get('perPage') as string, 10);

    return res(ctx.status(200), ctx.json(pComment.slice(page * perPage, page * perPage + perPage)));
  }),

  // 멤버
  rest.get(`${BASE_URL}/member/bookmark`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(bookmark));
  }),
];
