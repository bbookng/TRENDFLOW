import { api } from '@/apis/utils/axios';

export const getHotKeywords = () => {
  return api.get('/keyword/hot').then((res) => res.data);
};
