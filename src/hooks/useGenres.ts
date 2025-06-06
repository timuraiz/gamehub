import useData from './useData';
import { FetchResponse } from '../services/api-client';

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () => useData<FetchResponse<Genre>>('/genres', { params: { ordering: 'name' } });

export default useGenres;
