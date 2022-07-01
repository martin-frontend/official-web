import moment from 'moment';
import {
  GetBonusesHistoryDto,
  // eslint-disable-next-line import/named
  ActivityDto,
  PlayerActivityDto,
  BonusesIdsData,
  // ActivityId,
  Ids,
  ActivityOrderId,
  LevelOrderId,
  BonusesHistoryDetails,
  BonusesHistoryPage,
} from '../domain/bounusesHistory.model';
import { fetchGet } from '@/core/services/api/apiBase';

export function getBonusesHistory(
  dto: GetBonusesHistoryDto
): Promise<{ details: BonusesHistoryDetails; page: BonusesHistoryPage }> {
  return fetchGet('/finance/v2/player/wallet/log/page', {
    ...dto,
    startTime: moment(dto.startTime).startOf('day').valueOf(),
    endTime: moment(dto.endTime).endOf('day').valueOf(),
  });
}
export function getbonusIds(dto: Ids): Promise<BonusesIdsData[]> {
  return fetchGet('/finance/v1/player/bonus/ids', dto);
}
export function getbonusActivity(dto: ActivityOrderId): Promise<{
  activityDto: ActivityDto;
  playerActivityDto: PlayerActivityDto;
}> {
  return fetchGet('/official/v1/player/activity', dto);
}

export function getbonusLevel(dto: LevelOrderId) {
  return fetchGet('/official/v1/player/level', dto);
}
