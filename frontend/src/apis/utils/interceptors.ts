import { AxiosInstance } from 'axios';
import { onRequest, onRequestError, onResponse, onResponseError } from '@/apis/utils/logging';

export const loggingInterceptor = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest, onRequestError);
  instance.interceptors.response.use(onResponse, onResponseError);
  return instance;
};

export const tokenInterceptor = (instance: AxiosInstance): AxiosInstance => {
  // 아직 안 만듦
  return instance;
};
