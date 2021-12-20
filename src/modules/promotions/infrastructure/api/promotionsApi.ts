import { fetchGet, fetchPost } from '@/core/services/api/apiBase';
import { PromotionEvent } from '../../domain/promotionEvent';

export async function getApiPromotions(): Promise<PromotionEvent[]> {
  const response: PromotionEvent[] = await fetchGet<PromotionEvent[]>(
    '/official/v1/activity/all-opened'
  );

  return response;
}

export async function getApiPromotionById(id: number): Promise<PromotionEvent> {
  const response: PromotionEvent = await fetchGet<PromotionEvent>(
    '/official/v1/activity',
    { id }
  );

  return response;
}

export async function acceptPromotion(id: number): Promise<boolean> {
  try {
    await fetchPost<PromotionEvent>(
      '/official/v1/player/activity/accept',
      undefined,
      {
        activityId: id,
      }
    );
    return true;
  } catch (e) {
    return false;
  }
}
