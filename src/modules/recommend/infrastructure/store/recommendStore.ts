import { defineStore } from 'pinia';
// import { RecommendContentDto } from '../../domain/recommend.model';
import { Game } from '@/modules/game/domain/game.model';
// import { UserInfo } from '../../domain/user.model';
import {
  PagedNewArrivalGamesQuery,
  getPagedNewArrivalGames,
} from '@/modules/recommend/infrastructure/api/recommendApi';

interface RecommendStoreState {
  isShown: boolean;
  allContent: Game[];
  searchContent: Game[];
  queryObject: PagedNewArrivalGamesQuery;
  isNoData: boolean;
}

const useRecommendStore = defineStore('recommend', {
  state(): RecommendStoreState {
    return {
      isShown: false,
      allContent: [],
      isNoData: false,
      queryObject: {
        page: 0,
        size: 20,
      },
      searchContent: [],
    };
  },
  actions: {
    popUp() {
      this.isShown = true;
      this.updatePagedNewArrivalGames();
    },

    async search(query: PagedNewArrivalGamesQuery) {
      this.queryObject = { ...query };
      await this.updatePagedNewArrivalGames();
    },

    async updatePagedNewArrivalGames() {
      const { content } = await getPagedNewArrivalGames(this.queryObject);

      if (this.allContent.length === 0) {
        this.allContent = content;
      }

      this.isNoData = content.length === 0;

      this.searchContent = this.isNoData ? this.allContent : content;
    },

    close() {
      this.$reset();
    },
  },
});

export default useRecommendStore;
