import {
  GamesInGameTypeDto,
  GameType,
} from '@/modules/cms/domain/gameType/gameTypes';
import { PageType } from '@/modules/cms/domain/pageType';
import { fetchGet } from '../../../../../core/services/api/apiBase';

export default async function getApiGameTypes(
  page: PageType
): Promise<GameType[]> {
  const url = '/game/v1/game/type/all';
  const response = await fetchGet<GameType[]>(url, { page });
  return response;
}

export async function getApiGamesInGameType(
  typeId: number,
  page: number | null = null,
  size: number | null = null,
  sort: string | null = null
): Promise<GamesInGameTypeDto> {
  const url = '/game/v1/game/type/game/page';
  const response = await fetchGet<GamesInGameTypeDto>(url, {
    typeId,
    page,
    size,
    sort,
  });
  return response;
}
