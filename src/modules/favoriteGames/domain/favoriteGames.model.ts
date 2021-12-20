import { Game } from '@/modules/game/domain/game.model';

export interface PageFavoriteGamesObject {
  content: Game[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
