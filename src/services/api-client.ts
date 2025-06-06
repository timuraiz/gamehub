import axios, { AxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '95d160eea0294f10ac122494b9c1f6e5',
  },
});

export interface FetchResponse<T> {
  count: number;
  results: T[];
  next: string | null;
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(params?: AxiosRequestConfig) {
    const controller = new AbortController();
    const result = await apiClient.get<FetchResponse<T>>(this.endpoint, {
      signal: controller.signal,
      params: params?.params,
    });
    return result.data;
  }

  async get(params?: AxiosRequestConfig) {
    const controller = new AbortController();
    const result = await apiClient.get<T>(this.endpoint, {
      signal: controller.signal,
      params: params?.params,
    });
    return result.data;
  }
}

export default APIClient;
