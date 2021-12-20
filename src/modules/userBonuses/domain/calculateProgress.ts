import { PromotionEvent } from '@/modules/promotions/domain/promotionEvent';
import {
  PlayerActivityDetail,
  UserEventDto,
} from '../infrastructure/api/userEventApi.dto';

export function calculateConsecutiveCompletedDays(
  playerActivityDetails: PlayerActivityDetail[]
): number {
  return playerActivityDetails.reduce(
    ({ maxDays, currentConsecutiveDays, previousDay }, { completed, day }) => {
      let days;
      if (day !== previousDay + 1) {
        days = 0;
      } else {
        days = completed ? currentConsecutiveDays + 1 : 0;
      }

      return {
        maxDays: maxDays > days ? maxDays : days,
        currentConsecutiveDays: days,
        previousDay: day,
      };
    },
    { maxDays: 0, currentConsecutiveDays: 0, previousDay: 0 }
  ).maxDays;
}

export function calculateInProgress(userEvent: PromotionEvent & UserEventDto) {
  if (userEvent.consecutiveDays) {
    return (
      calculateConsecutiveCompletedDays(userEvent.playerActivityDetails || []) /
      userEvent.consecutiveDays
    );
  }
  return 0;
}

export function calculateProgress(
  userEvent: PromotionEvent & UserEventDto
): number {
  //   Cumulative Bet Amount
  if (userEvent.cumulativeBetAmount && !userEvent.consecutiveDays) {
    return (
      (userEvent.playerActivityDetails?.[0]?.currentCumulativeBetAmount || 0) /
      userEvent.cumulativeBetAmount
    );
  }

  // Cumulative Win Amount
  if (userEvent.cumulativeWinAmount && !userEvent.consecutiveDays) {
    return (
      (userEvent.playerActivityDetails?.[0]?.currentCumulativeWinAmount || 0) /
      userEvent.cumulativeWinAmount
    );
  }

  if (userEvent.consecutiveDays) {
    return (
      calculateConsecutiveCompletedDays(userEvent.playerActivityDetails || []) /
      userEvent.consecutiveDays
    );
  }
  return 0;
}
