import { rest } from 'msw';
import dummy from './data/dummy.json';
import hot from './data/hot.json';

export const handlers = [
  rest.get('/test', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummy));
  }),

  rest.get('/keyword/hot', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(hot));
  }),
];
