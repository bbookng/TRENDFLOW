import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface LogOnDevInterface {
  log: (msg: any, color?: string) => void;
  info: (msg: string, color?: string) => void;
  error: (msg: string) => void;
  warn: (msg: any) => void;
  dir: (msg: any) => void;
}

const logOnDev: LogOnDevInterface = {
  log: (msg, color = '') => {
    if (import.meta.env.MODE === 'development') {
      console.log(msg, color);
    }
  },
  info: (msg, color = '') => {
    if (import.meta.env.MODE === 'development') {
      console.info(msg, color);
    }
  },
  error: (msg) => {
    if (import.meta.env.MODE === 'development') {
      console.error(msg);
    }
  },
  warn: (msg) => {
    if (import.meta.env.MODE === 'development') {
      console.warn(msg);
    }
  },
  dir: (msg) => {
    if (import.meta.env.MODE === 'development') {
      console.dir(msg);
    }
  },
};

export const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  logOnDev.info(
    `🙏 %c[API] ${config.method?.toUpperCase()} ${config.url} | [::request::]`,
    'color: #229910'
  );
  logOnDev.dir(config);
  logOnDev.log('', '');
  return config;
};

export const onRequestError = (err: AxiosError): Promise<AxiosError> => {
  logOnDev.error(
    `💥 [API] ${err.config?.method?.toUpperCase()} ${err.config?.url} | [::request error::]`
  );
  logOnDev.dir(err);
  logOnDev.log('', '');
  return Promise.reject(err);
};

export const onResponse = (res: AxiosResponse): AxiosResponse => {
  logOnDev.info(
    `👌 %c [API] ${res.config.method?.toUpperCase()} ${res.config.url} | [::response::] ${
      res.status
    }`,
    'color: #13ce29'
  );
  logOnDev.dir(res);
  logOnDev.log('', '');
  return res;
};

export const onResponseError = (err: AxiosError): Promise<AxiosError> => {
  logOnDev.error(
    `💥 [API] ${err.config?.method?.toUpperCase()} ${err.config?.url} | [::response error::]`
  );
  logOnDev.dir(err);
  logOnDev.log('', '');
  return Promise.reject(err);
};
