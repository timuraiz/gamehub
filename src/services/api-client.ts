import axios, { AxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '95d160eea0294f10ac122494b9c1f6e5',
  },
});

interface FetchResponse<T> {
  count: number;
  results: T[];
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
      params: params,
    });
    return result.data;
  }
}

export default APIClient;
