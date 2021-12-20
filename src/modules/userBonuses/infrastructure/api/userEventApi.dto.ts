import { ApiTableInfo } from '@/core/interfaces/api';
import { PromotionEvent } from '@/modules/promotions/domain/promotionEvent';

export interface PlayerActivityDetail {
  betFulfill: boolean;
  completed: boolean;
  currentCumulativeBetAmount: number;
  currentCumulativeWinAmount: number;
  day: number;
  id: number;
  playerActivityId: number;
  winFulfill: boolean;
}

export interface UserEventDto {
  acceptedAt: number;
  activityId: number;
  agentId: number;
  bonusAmount: number;
  bonusReceivedAt: number | null;
  completedAt: number;
  id: number;
  playerActivityDetails: null | PlayerActivityDetail[];
  playerId: number;
  transactionStatus: number;
}

export interface InProgressUserEventDto {
  activities: PromotionEvent[];
  playerActivities: ApiTableInfo<UserEventDto>;
}

export interface SearchCompletedUserEventParams {
  acceptTimeFrom: number;
  acceptTimeTo: number;
  page: number;
  size: number;
  playerActivityStatus?: 1 | 2;
  title?: string;
}
