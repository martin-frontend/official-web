import moment from 'moment';
import {
  GameType,
  PaginatedBetsObject,
  GetPaginatedBets,
  GameTypeOption,
} from '../../domain/gameHistory.model';
import { fetchGet } from '@/core/services/api/apiBase';

export async function getPaginatedBets(
  dto: GetPaginatedBets
): Promise<PaginatedBetsObject> {
  return fetchGet('/game/v1/bet/page', {
    ...dto,
    page: dto.page - 1,
    startTime: moment(dto.startTime).startOf('day').valueOf(),
    endTime: moment(dto.endTime).endOf('day').valueOf(),
  });
}

export async function getGameType(): Promise<GameType> {
  return fetchGet('/game/v1/bet/type');
}

export type SearchGetPaginatedBetsLogForm = {
  page: number;
  size: number;
  startTime: Date;
  endTime: Date;
  category?: GameTypeOption;
  gameIds?: number[];
};
