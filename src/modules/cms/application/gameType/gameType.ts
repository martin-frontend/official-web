import {
  GameTypeWithGames,
  getGamesFromDto,
} from '@/modules/cms/domain/gameType/gameTypes';
import { PageType } from '@/modules/cms/domain/pageType';
import getApiGameTypes, {
  getApiGamesInGameType,
} from '@/modules/cms/infrastructure/gameType/api/gameTypesApi';
import useGameTypeStore from '@/modules/cms/infrastructure/gameType/store/gameTypeStore';

export async function initGameTypes(page: PageType): Promise<void> {
  const gameTypeStore = useGameTypeStore();
  if (gameTypeStore[page].length) return;

  const gameTypes = await getApiGameTypes(page);

  const gameTypesWithGames: GameTypeWithGames[] = await Promise.all(
    gameTypes.map(async ({ id, name }): Promise<GameTypeWithGames> => {
      const gamesDto = await getApiGamesInGameType(id, 0, 8);
      const games = getGamesFromDto(gamesDto);
      const { totalPages, number } = gamesDto;

      return { id, name, games, totalPages, page: number };
    })
  );

  gameTypeStore.setGamesInGameType(page, gameTypesWithGames);
}

export async function updateGameType(
  page: PageType,
  gameTypesIndex: number
): Promise<void> {
  const gameTypeStore = useGameTypeStore();

  gameTypeStore[page][gameTypesIndex].page += 1;

  const { id, page: gameTypePgae } = gameTypeStore[page][gameTypesIndex];

  const gamesDto = await getApiGamesInGameType(id, gameTypePgae, 8);
  const games = getGamesFromDto(gamesDto);
  const { totalPages } = gamesDto;

  gameTypeStore[page][gameTypesIndex].totalPages = totalPages;

  gameTypeStore[page][gameTypesIndex].games =
    gameTypeStore[page][gameTypesIndex].games.concat(games);
}
