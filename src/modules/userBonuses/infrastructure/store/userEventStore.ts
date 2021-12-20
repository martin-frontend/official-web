import { defineStore } from 'pinia';
import { PromotionEvent } from '@/modules/promotions/domain/promotionEvent';
import { UserEvent } from '../../domain/userEvent';

const useUserEventStore = defineStore('userEvent', {
  state: (): {
    historyUserEvents: UserEvent[];
    totalHistoryUserEvents: number;
    inProgressUserEvent: UserEvent[];
    openedUserEvent: null | PromotionEvent;
  } => ({
    historyUserEvents: [],
    totalHistoryUserEvents: 0,
    inProgressUserEvent: [],
    openedUserEvent: null,
  }),
});

export default useUserEventStore;
