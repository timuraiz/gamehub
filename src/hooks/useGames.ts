import { GameQuery } from '../store';
import { useInfiniteQuery } from '@tanstack/react-query';
import APIClient, { FetchResponse } from '../services/api-client';
import { Game } from '../entities/Game';

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
