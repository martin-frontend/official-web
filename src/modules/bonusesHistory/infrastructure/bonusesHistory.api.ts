import moment from 'moment';
import {
  GetBonusesHistoryDto,
  BonusesHistoryObject,
  // eslint-disable-next-line import/named
  ActivityDto,
  PlayerActivityDto,
  BonusesIdsData,
  // ActivityId,
  Ids,
  ActivityOrderId,
  LevelOrderId,
} from '../domain/bounusesHistory.model';
import { fetchGet } from '@/core/services/api/apiBase';

export function getBonusesHistory(
  dto: GetBonusesHistoryDto
): Promise<BonusesHistoryObject> {
  return fetchGet('/finance/v1/player/wallet/log/page', {
    ...dto,
    startTime: moment(dto.startTime).startOf('day').valueOf(),
    endTime: moment(dto.endTime).endOf('day').valueOf(),
    // size: 10,
  });
}

// export function getbonusIds(dto: Ids) {
//   return fetchGet('/finance/v1/player/bonus/ids', {
//     ...dto,
//     ids: ['BNS0000000002KWBNILJY', 'BNS0000000002KWA4EXAG'],
//   });
// }
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
