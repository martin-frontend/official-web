import { getApiPromotionById } from '@/modules/promotions/infrastructure/api/promotionsApi';
import useUserEventStore from '../infrastructure/store/userEventStore';

export default async function viewEvent(id: number): Promise<void> {
  const promotionEvent = await getApiPromotionById(id);

  const userEventStore = useUserEventStore();

  userEventStore.openedUserEvent = promotionEvent;
}
