import { AxiosRequestConfig, CanceledError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import APIClient, { FetchResponse } from '../services/api-client';

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  staleTime = 24 * 60 * 60 * 1000,
  initialData?: T
) => {
  const apiClient = new APIClient<T>(endpoint);

  const { data, error, isLoading } = useQuery<T, Error, T>({
    queryKey: [endpoint, requestConfig],
    queryFn: () => apiClient.get(requestConfig),
    staleTime: staleTime,
    initialData: initialData,
  });

  return { data, error, isLoading };
};

export default useData;
