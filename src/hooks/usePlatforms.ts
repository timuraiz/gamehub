import useData from './useData';
import { FetchResponse } from '../services/api-client';
import platforms from '../data/platforms';
import { Platform } from '../entities/Platform';

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
