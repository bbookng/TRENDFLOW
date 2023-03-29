import { rest } from 'msw';
import { hot, pComment, relate, social, youtube } from '@/mocks/data';

export const handlers = [
  // 키워드
  rest.get('/keyword/hot', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(hot));
  }),

  rest.get('/keyword/relate', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(relate));
  }),

  // 분석
  rest.get('/analyze/social', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(social));
  }),

  rest.post('/member/login', (req, res, ctx) => {
    return res(ctx.status(500));
  }),

  // 유튜브

  rest.post(`/analyze/youtube`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(youtube));
  }),

  rest.post('/analyze/youtube/comment', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(pComment));
  }),
];
