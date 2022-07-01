import { PlayGameType, Game } from '../domain/game.model';
import { checkUserStatus } from '@/modules/user/application/user';
import { updateAmount } from '@/modules/userBalance/application/balance';
import useVisitorIdStore from '@/core/auth/visitorId';

export function getGamePath(
  id: string,
  isDemo: boolean,
  isAuthenticated: boolean
): string {
  const visitorIdStore = useVisitorIdStore();
  return isAuthenticated === undefined
    ? ''
    : `api/game-provider/v1/thirdparty/game/provider${
        isAuthenticated && !isDemo ? '' : '/demo'
      }/${id}?visitor-id=${visitorIdStore.visitorId}`;
}

export function duringPlayingGame(): void {
  updateAmount();
}

export async function playGameTypeEvent(
  { id, name }: Game,
  type: PlayGameType
) {
  const query = {
    id,
    name,
    demo: `${type === PlayGameType.DEMO}`,
  };

  if (!(await checkUserStatus()) && type === PlayGameType.REAL) {
    query.demo = 'true';
  }

  return query;
}
