import { defineStore } from 'pinia';
import { PageType } from '@/modules/cms/domain/pageType';
import { Banner } from '@/modules/cms/domain/banner/banner';

interface BannerStoreState {
  HOME: Banner[];
  SLOT: Banner[];
  JACKPOT: Banner[];
  LIVE_CASINO: Banner[];
  TABLE_GAME: Banner[];
}

const useBannerStore = defineStore('banner', {
  state(): BannerStoreState {
    return { HOME: [], SLOT: [], JACKPOT: [], LIVE_CASINO: [], TABLE_GAME: [] };
  },
  actions: {
    setBanners(page: PageType, banners: Banner[]) {
      this[page] = banners;
    },
  },
});

export default useBannerStore;
