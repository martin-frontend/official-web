import { LoginHistory, GetLoginHistoryDto } from '../domain/loginHistory.model';

import { fetchGet } from '@/core/services/api/apiBase';

export function getLoginHistory(dto: GetLoginHistoryDto) {
  return fetchGet<LoginHistory[]>('/official/v1/login-log', {
    startTime: dto.startTime.getTime(),
    endTime: dto.endTime.getTime(),
  });
}
