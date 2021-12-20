import { defineStore } from 'pinia';
import { PromotionEvent } from '../../domain/promotionEvent';

interface PromotionsStoreState {
  promotions: PromotionEvent[];
  openedPromotionIndex: null | number;
}

const usePromotionsStore = defineStore('promotions', {
  state(): PromotionsStoreState {
    return { promotions: [], openedPromotionIndex: null };
  },
  actions: {
    setPromotions(promotions: PromotionEvent[]) {
      this.promotions = promotions;
    },
    setOpenedPromotionIndex(index: null | number) {
      this.openedPromotionIndex = index;
    },
  },
});

export default usePromotionsStore;
