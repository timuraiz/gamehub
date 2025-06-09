import { Platform } from './Platform';
import { Genre } from './Genre';
import { Publisher } from './Publisher';

export interface GameDetail {
  id: number;
  name: string;
  description_raw: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  genres: Genre[];
  publishers: Publisher[];
}
