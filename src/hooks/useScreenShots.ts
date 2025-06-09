import useData from './useData';
import { FetchResponse } from '../services/api-client';
import { ScreenShot } from '../entities/ScreenShot';

const useScreenShots = (id: number) =>
  useData<FetchResponse<ScreenShot>>(`/games/${id}/screenshots`);

export default useScreenShots;
