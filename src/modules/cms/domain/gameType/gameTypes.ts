import { Game } from '../../../game/domain/game.model';

export interface GameType {
  id: number;
  name: string;
  totalPages: number;
  page: number;
}

export interface GamesInGameTypeDto {
  content: Game[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export type GameTypeWithGames = GameType & { games: Game[] };

export function getGamesFromDto(dto: GamesInGameTypeDto): Game[] {
  return dto.content;
}
