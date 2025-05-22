import { AxiosRequestConfig, CanceledError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/api-client';

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  staleTime = 24 * 60 * 60 * 1000,
  initialData?: FetchResponse<T>
) => {
  const apiClient = new APIClient<T>(endpoint);

  const { data, error, isLoading } = useQuery<FetchResponse<T>, Error, FetchResponse<T>>({
    queryKey: [endpoint, requestConfig],
    queryFn: () => apiClient.getAll(requestConfig),
    staleTime: staleTime,
    initialData: initialData,
  });

  return { data, error, isLoading };
};

export default useData;
