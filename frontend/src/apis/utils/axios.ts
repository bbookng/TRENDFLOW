import axios, { AxiosRequestConfig } from 'axios';
import { loggingInterceptor, tokenInterceptor } from '@/apis/utils/interceptors';

const { VITE_API_URL: BASE_URL } = import.meta.env;

// 토큰 X
const axiosInstance = (url: string, options: AxiosRequestConfig = {}) => {
  const instance = axios.create({ baseURL: url, ...options });
  return loggingInterceptor(instance);
};

// 토큰 O
const axiosAuthInstance = (url: string, options: AxiosRequestConfig = {}) => {
  const instance = axios.create({ baseURL: url, ...options });
  tokenInterceptor(instance);
  return loggingInterceptor(instance);
};

export const api = axiosInstance(BASE_URL);
export const authApi = axiosAuthInstance(BASE_URL);
