import { GameQuery } from '../store';
import { useInfiniteQuery } from '@tanstack/react-query';
import APIClient, { FetchResponse } from '../services/api-client';
import { Genre } from './useGenres';

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
  genres: Genre[];
  released: string;
  rating: number;
  slug: string;
}

const apiClient = new APIClient<Game>('/games');

const useGames = (gameQuery: GameQuery) => {
  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ['games', gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genreId,
          platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
          page_size: 20,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;
      return allPages.length + 1;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24h
  });
};

export default useGames;
