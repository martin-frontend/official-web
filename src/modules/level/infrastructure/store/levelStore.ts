import { defineStore } from 'pinia';
import {
  LevelOption,
  LevelStatistic,
} from '@/modules/level/domain/level.model';
// eslint-disable-next-line import/no-cycle
import { converToLevelProgress } from '@/modules/level/application/level';

export interface LevelStoreState {
  options: LevelOption[] | null;
  statistic: LevelStatistic | null;
}

const useLevelStore = defineStore('levels', {
  state: (): LevelStoreState => ({ options: null, statistic: null }),

  getters: {
    levelProgress(state): number {
      return converToLevelProgress(state);
    },
  },

  actions: {
    setOptions(options: LevelOption[]) {
      this.options = options;
    },

    setStatistic(statistic: LevelStatistic) {
      this.statistic = statistic;
    },
  },
});

export default useLevelStore;
