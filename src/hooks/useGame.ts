import { GameDetail } from '../entities/GameDetail';
import useData from './useData';

const useGame = (slug: string) => useData<GameDetail>(`/games/${slug}`);

export default useGame;
