import { checkUserStatus } from '@/modules/user/application/user';
import { PageFavoriteGamesObject } from '../domain/favoriteGames.model';
// import moment from 'moment';
import { fetchGet, fetchPost, fetchDelete } from '@/core/services/api/apiBase';

export async function getPageFavoriteGames(dto: {
  page: number;
  size: number;
}): Promise<PageFavoriteGamesObject> {
  const response: PageFavoriteGamesObject = await fetchGet(
    '/game/v1/player/game/favorite',
    {
      ...dto,
    }
  );
  return response;
}

export async function addFavoriteGame(gameId: number) {
  return fetchPost('/game/v1/player/game/favorite', undefined, { gameId });
}

export function removeFavoriteGame(gameId: number) {
  return fetchDelete('/game/v1/player/game/favorite', { gameId });
}

export async function launchGame(gameId: number) {
  if (!(await checkUserStatus())) {
    return;
  }
  fetchPost('/game/v1/player/game/launch', undefined, {
    gameId,
  });
}
