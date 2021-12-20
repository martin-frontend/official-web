import usePromotionsStore from '@/modules/promotions/infrastructure/store/promotionsStore';
import { getApiPromotions } from '../infrastructure/api/promotionsApi';

export async function updatePromotions() {
  const promotions = await getApiPromotions();

  const promotionsStore = usePromotionsStore();
  promotionsStore.setPromotions(promotions);
}

export function openPromotionDialog(index: number) {
  const promotionsStore = usePromotionsStore();
  promotionsStore.setOpenedPromotionIndex(index);
}

export function closePromotionDialog() {
  const promotionsStore = usePromotionsStore();
  promotionsStore.setOpenedPromotionIndex(null);
}
