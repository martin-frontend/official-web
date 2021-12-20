import { fetchGet, fetchPost } from '@/core/services/api/apiBase';
import {
  InProgressUserEventDto,
  SearchCompletedUserEventParams,
} from './userEventApi.dto';

export async function getApiInProgressUserEvent(): Promise<InProgressUserEventDto> {
  return fetchGet<InProgressUserEventDto>(
    '/official/v1/player/activity/in-progress'
  ).then((data) => data);
}

export async function searchApiCompletedUserEvent(
  params: SearchCompletedUserEventParams
): Promise<InProgressUserEventDto> {
  const result = await fetchGet<InProgressUserEventDto>(
    '/official/v1/player/activity/completed',
    params
  );
  return result;
}

export async function receiveApiBonus(id: number): Promise<void> {
  await fetchPost(`/official/v1/player/activity/receive?id=${id}`);
}
