import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { SUCCESS_CODE } from './config';

const axiosInstance: AxiosInstance = axios.create({
  timeout: 10 * 1000,
  // 基础接口地址
  baseURL: import.meta.env.VITE_BASIC_API as string,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code } = response.data;
    if (SUCCESS_CODE.includes(code)) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
