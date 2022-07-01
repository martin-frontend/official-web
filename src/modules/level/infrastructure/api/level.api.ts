import { fetchGet } from '@/core/services/api/apiBase';
import {
  LevelOption,
  LevelStatistic,
} from '@/modules/level/domain/level.model';

export async function getLevelOptionsApi(): Promise<LevelOption[]> {
  const options = await fetchGet<LevelOption[]>('/official/v1/level/all');
  return options;
}

export async function getCurrentLevelStatistic(): Promise<LevelStatistic> {
  const statistic = await fetchGet<LevelStatistic>(
    '/official/v1/player/level/current-statistic'
  );
  return statistic;
}
