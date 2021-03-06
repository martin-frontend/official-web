/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';
import { PromotionEvent } from '@/modules/promotions/domain/promotionEvent';
import {
  InProgressUserEventDto,
  SearchCompletedUserEventParams,
  UserEventDto,
} from '../infrastructure/api/userEventApi.dto';
import {
  calculateProgress,
  calculateInProgress,
  consecutiveDayAmount,
  calculateConsecutiveCompletedDays,
} from './calculateProgress';

export interface UserEvent {
  id: number;
  name: string;
  acceptedAt: string;
  bonus: number;
  dueDate: string;
  // progress: string;
  isReceived: boolean;
  isExpired: boolean;
  isCompleted: boolean;
  isActivityExpired: boolean;
  imageUrl: string;
  description: string;
  title: string;
  activityId: number;
  betAmount: number;
}

function formatTime(time: number): string {
  return time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : '';
}

function checkIsExpired(
  completedAtTimeStamp: number,
  receptionLimit: number
): boolean {
  const receivedTime = moment(completedAtTimeStamp);
  const expiredTime = moment(receivedTime).add(receptionLimit, 'days');
  return receivedTime.isAfter(expiredTime);
}

function checkActivityIsExpired(endDateTimeStamp: number): boolean {
  const nowTime = moment();
  const endDateTime = moment(endDateTimeStamp);
  return nowTime.isAfter(endDateTime);
}

export function userEventsDtoToUserEvents(
  dto: InProgressUserEventDto,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line no-unused-vars
  isCompletedEvents = false
): UserEvent[] {
  const {
    activities,
    playerActivities: { content },
  } = dto;

  const activitiesMapping = Object.fromEntries(
    activities.map(({ id, ...rest }) => [id, rest])
  );

  return content
    .map(({ activityId, ...rest }): PromotionEvent & UserEventDto => ({
      activityId,
      ...rest,
      ...activitiesMapping[activityId],
    }))
    .map((userEvent) => ({
      id: userEvent.id,
      name: userEvent.title,
      acceptedAt: formatTime(userEvent.acceptedAt),
      bonus: userEvent.bonusAmount,
      dueDate: formatTime(userEvent.endDate),
      progress: `${(isCompletedEvents
        ? 100
        : calculateProgress(userEvent) * 100
      ).toFixed(2)} %`,
      inprogress: `${calculateInProgress(userEvent).toFixed(2)}%`,
      isCompleted: !!userEvent.completedAt,
      isActivityExpired: checkActivityIsExpired(userEvent.endDate),
      isReceived: !!userEvent.bonusReceivedAt,
      isExpired: checkIsExpired(
        userEvent.completedAt,
        userEvent.bonusReceptionLimit
      ),
      imageUrl: userEvent.imageUrl,
      mobileImageUrl: userEvent.mobileImageUrl,
      description: userEvent.description,
      title: userEvent.title,
      activityId: userEvent.activityId,

      // ????????????????????????????????????
      betAmount: userEvent.betAmount,
      betConsecutiveTimes: userEvent.betConsecutiveTimes,
      winConsecutiveTimes: userEvent.winConsecutiveTimes,
      winAmount: userEvent.winAmount,
      cumulativeBetAmount: userEvent.cumulativeBetAmount,
      cumulativeWinAmount: userEvent.cumulativeWinAmount,
      betFulfill: userEvent.playerActivityDetails?.[0]?.betFulfill,
      winFulfill: userEvent.playerActivityDetails?.[0]?.winFulfill,
      completed: userEvent.playerActivityDetails?.[0]?.completed,
      currentCumulativeBetAmount:
        userEvent.playerActivityDetails?.[0]?.currentCumulativeBetAmount,
      currentCumulativeWinAmount:
        userEvent.playerActivityDetails?.[0]?.currentCumulativeWinAmount,
      consecutiveDays: userEvent.consecutiveDays,
      userConsecutiveDayN: `${consecutiveDayAmount(userEvent)}`,
      userConsecutiveDayY: `${calculateConsecutiveCompletedDays(
        userEvent.playerActivityDetails || []
      )}`,
    }));
}

enum PlayerActivityStatus {
  all = 0,
  expired = 1,
  completed = 2,
}

export type SearchCompletedUserEventForm = {
  title: string;
  startDate: Date;
  endDate: Date;
  page: number;
  playerActivityStatus: PlayerActivityStatus;
};

export function searchCompletedUserEventFormToDto({
  title,
  startDate,
  endDate,
  page,
  playerActivityStatus,
}: SearchCompletedUserEventForm): SearchCompletedUserEventParams {
  return {
    page,
    size: 10,
    acceptTimeFrom: moment(startDate).startOf('day').valueOf(),
    acceptTimeTo: moment(endDate).endOf('day').valueOf(),
    ...(title ? { title } : null),
    ...(playerActivityStatus ? { playerActivityStatus } : null),
  };
}

// startTime: moment(dto.startTime).startOf('day').valueOf(),
// endTime: moment(dto.endTime).endOf('day').valueOf(),
