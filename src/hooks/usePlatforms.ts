import useData from './useData';
import platforms from '../data/platforms';

interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () =>
  useData<Platform>(
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
    }
  );

export default usePlatforms;
