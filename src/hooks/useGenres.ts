import useData from './useData';
import { FetchResponse } from '../services/api-client';
import { Genre } from '../entities/Genre';

const useGenres = () => useData<FetchResponse<Genre>>('/genres', { params: { ordering: 'name' } });

export default useGenres;
