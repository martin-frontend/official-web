import { defineStore } from 'pinia';
import { Game } from '@/modules/game/domain/game.model';
import { GameTypeWithGames } from '@/modules/cms/domain/gameType/gameTypes';
import { PageType } from '@/modules/cms/domain/pageType';

interface GamesInGameTypeStoreState {
  HOME: GameTypeWithGames[];
  SLOT: GameTypeWithGames[];
  JACKPOT: GameTypeWithGames[];
  LIVE_CASINO: GameTypeWithGames[];
  TABLE_GAME: GameTypeWithGames[];
}

const useGameTypeStore = defineStore('gameType', {
  state(): GamesInGameTypeStoreState {
    return { HOME: [], SLOT: [], JACKPOT: [], LIVE_CASINO: [], TABLE_GAME: [] };
  },
  actions: {
    setGamesInGameType(
      page: PageType,
      gameTypesWithGames: GameTypeWithGames[]
    ) {
      this[page] = gameTypesWithGames;
    },

    updateGamesInGameType(
      page: PageType,
      gameTypesIndex: number,
      newGames: Game[]
    ) {
      this[page][gameTypesIndex].games.concat(newGames);
    },
  },
});

export default useGameTypeStore;
