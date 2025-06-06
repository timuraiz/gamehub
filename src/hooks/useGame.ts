import useData from './useData';

export interface GameDetail {
  id: number;
  name: string;
  description_raw: string;
}

const useGame = (slug: string) => useData<GameDetail>(`/games/${slug}`);

export default useGame;
