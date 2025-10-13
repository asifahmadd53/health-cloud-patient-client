import {AxiosRequestConfig, AxiosResponse} from 'axios';
import axiosInstance from './axiosInstance';

async function apiInvoker<T = any>(
  url: string,
  method: AxiosRequestConfig['method'] = 'GET',
  data?: any,
  config: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> {
  try {
    const res = await axiosInstance({
      url,
      method,
      data,
      ...config,
    });
    return res;
  } catch (error) {
    console.error(`API call to ${url} failed:`, error);
    throw error;
  }
}

export default apiInvoker;
