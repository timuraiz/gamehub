import useData from './useData';
import { Trailer } from '../entities/Trailer';
import { FetchResponse } from '../services/api-client';

const useTrailers = (id: string) => useData<FetchResponse<Trailer>>(`/games/${id}/movies`);

export default useTrailers;
