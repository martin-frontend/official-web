import { PromotionEvent } from '@/modules/promotions/domain/promotionEvent';
import {
  PlayerActivityDetail,
  UserEventDto,
} from '../infrastructure/api/userEventApi.dto';

// 計算已完成的連續天數
export function calculateConsecutiveCompletedDays(
  playerActivityDetails: PlayerActivityDetail[]
): number {
  return playerActivityDetails.reduce(
    ({ currentConsecutiveDays, previousDay }, { completed, day }) => {
      let days = currentConsecutiveDays;
      if (day !== previousDay + 1) {
        days = 0;
      }
      days = completed ? days + 1 : 0;

      return {
        currentConsecutiveDays: days,
        previousDay: day,
      };
    },
    { currentConsecutiveDays: 0, previousDay: 0 }
  ).currentConsecutiveDays;
}

function calculateDetailInProgress(
  promotionEvent: PromotionEvent,
  playerActivityDetail: PlayerActivityDetail
): number {
  const betFulfillState = playerActivityDetail.betFulfill;
  const winFulfillState = playerActivityDetail.winFulfill;

  let betFulfillRate = 0;
  // let betConsecutiveTimesRate = 0;
  let winFulfillRate = 0;
  // let winConsecutiveTimesRate = 0;
  let cumulativeBetAmountRate = 0;
  let cumulativeWinAmountRate = 0;

  // 計算活動總共有幾個條件
  let promotionComdition = 0;
  // betFulfill
  if (promotionEvent.betAmount > 0 || promotionEvent.betConsecutiveTimes > 1) {
    promotionComdition += 1;
    if (betFulfillState === true) {
      betFulfillRate = 1;
    } else if (betFulfillState === false) {
      betFulfillRate = 0;
    }
  }
  // if (promotionEvent.betAmount > 0) {
  //   promotionComdition += 1;
  //   if (betFulfillState === true) {
  //     betAmountRate = 1;
  //   } else if (betFulfillState === false) {
  //     betAmountRate = 0;
  //   }
  // }

  // if (promotionEvent.betConsecutiveTimes > 1) {
  //   promotionComdition += 1;
  //   if (betFulfillState === true) {
  //     betConsecutiveTimesRate = 1;
  //   } else if (betFulfillState === false) {
  //     betConsecutiveTimesRate = 0;
  //   }
  // }

  // winFulfill
  if (promotionEvent.winAmount > 0 || promotionEvent.winConsecutiveTimes > 1) {
    promotionComdition += 1;
    if (winFulfillState === true) {
      winFulfillRate = 1;
    } else if (winFulfillState === false) {
      winFulfillRate = 0;
    }
  }
  // if (promotionEvent.winAmount > 0) {
  //   promotionComdition += 1;
  //   if (winFulfillState === true) {
  //     winAmountRate = 1;
  //   } else if (winFulfillState === false) {
  //     winAmountRate = 0;
  //   }
  // }
  // if (promotionEvent.winConsecutiveTimes > 1) {
  //   promotionComdition += 1;
  //   if (winFulfillState === true) {
  //     winConsecutiveTimesRate = 1;
  //   } else if (winFulfillState === false) {
  //     winConsecutiveTimesRate = 0;
  //   }
  // }
  if (promotionEvent.cumulativeBetAmount > 0) {
    promotionComdition += 1;
    if (playerActivityDetail.currentCumulativeBetAmount > 0) {
      cumulativeBetAmountRate =
        playerActivityDetail.currentCumulativeBetAmount /
        promotionEvent.cumulativeBetAmount;
    }
  }
  if (promotionEvent.cumulativeWinAmount > 0) {
    promotionComdition += 1;
    if (playerActivityDetail.currentCumulativeWinAmount > 0) {
      cumulativeWinAmountRate =
        playerActivityDetail.currentCumulativeWinAmount /
        promotionEvent.cumulativeWinAmount;
    }
  }
  return (
    ((betFulfillRate +
      winFulfillRate +
      cumulativeBetAmountRate +
      cumulativeWinAmountRate) /
      promotionComdition) *
    100
  );
}
// 計算已下注天數(參考用)
export function consecutiveDayAmount(userEvent: PromotionEvent & UserEventDto) {
  const details = userEvent.playerActivityDetails;
  if (details == null || details.length === 0) {
    return 0;
  }
  return details.length;
}

// 計算完成率
export function calculateInProgress(
  userEvent: PromotionEvent & UserEventDto
): number {
  const details = userEvent.playerActivityDetails;
  if (details == null || details.length === 0) {
    return 0;
  }

  const { consecutiveDays } = userEvent;

  if (consecutiveDays > 1) {
    // 如果今天的完成狀態是false，計算當天的完成率
    const lastDayAchieved =
      details[details.length - 1].completed === false
        ? calculateDetailInProgress(userEvent, details[details.length - 1])
        : 0;
    return (
      ((calculateConsecutiveCompletedDays(
        userEvent.playerActivityDetails || []
      ) +
        lastDayAchieved / 100) /
        userEvent.consecutiveDays) *
      100
    );
  }
  if (consecutiveDays === 1 || consecutiveDays === 0) {
    return calculateDetailInProgress(userEvent, details[0]);
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
