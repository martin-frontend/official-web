import { checkUserStatus } from '@/modules/user/application/user';
import { Game } from '@/modules/game/domain/game.model';
import { fetchGet } from '@/core/services/api/apiBase';

export async function getGame(id: number): Promise<Game | undefined> {
  if (!(await checkUserStatus())) {
    return undefined;
  }

  const response: Game = await fetchGet('/game/v1/game', {
    id,
  });

  return response;
}
