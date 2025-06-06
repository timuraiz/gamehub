import { Genre } from './Genre';
import { Platform } from './Platform';

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
