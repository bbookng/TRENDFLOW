import { rest } from 'msw';
import dummy from './data/dummy.json';

export const handlers = [
  rest.get('/test', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummy));
  }),
];
