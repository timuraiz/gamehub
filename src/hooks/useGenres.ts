import genres from '../data/genres';
import useData from './useData';

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () => useData<Genre>('/genres', { params: { ordering: 'name' } });

export default useGenres;
