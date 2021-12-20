import { updateBonuses } from '@/modules/userBalance/application/balance';
import {
  SearchCompletedUserEventForm,
  searchCompletedUserEventFormToDto,
  userEventsDtoToUserEvents,
} from '../domain/userEvent';
import {
  getApiInProgressUserEvent,
  searchApiCompletedUserEvent,
} from '../infrastructure/api/userEventApi';
import { SearchCompletedUserEventParams } from '../infrastructure/api/userEventApi.dto';
import useUserEventStore from '../infrastructure/store/userEventStore';

async function updateCurrencyEvent() {
  const userEventStore = useUserEventStore();

  const events = userEventsDtoToUserEvents(await getApiInProgressUserEvent());
  userEventStore.inProgressUserEvent = events;
}

export async function updateCompletionEvent({
  page,
  ...rest
}: SearchCompletedUserEventForm) {
  const userEventStore = useUserEventStore();

  const params: SearchCompletedUserEventParams =
    searchCompletedUserEventFormToDto({ page: page - 1, ...rest });

  const eventDto = await searchApiCompletedUserEvent(params);

  const events = userEventsDtoToUserEvents(eventDto, true);
  userEventStore.historyUserEvents = events;
  userEventStore.totalHistoryUserEvents =
    eventDto.playerActivities.totalElements;
}

export function initBonuses(
  defaultFormValue: SearchCompletedUserEventForm
): void {
  updateBonuses();
  updateCurrencyEvent();
  updateCompletionEvent(defaultFormValue);
}
