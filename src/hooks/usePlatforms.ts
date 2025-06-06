import useData from './useData';
import { FetchResponse } from '../services/api-client';
import platforms from '../data/platforms';

interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () =>
  useData<FetchResponse<Platform>>(
    '/platforms/lists/parents',
    {
      params: {
        ordering: 'name',
      },
    },
    24 * 60 * 60 * 1000,
    {
      count: platforms.length,
      results: platforms,
      next: null,
    }
  );

export default usePlatforms;
