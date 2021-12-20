import { RecommendDataDto } from '../../domain/recommend.model';
import { fetchGet } from '@/core/services/api/apiBase';

export interface PagedNewArrivalGamesQuery {
  page: number;
  search?: string;
  size: number;
  sort?: string[];
}

export async function getPagedNewArrivalGames(
  query: PagedNewArrivalGamesQuery
): Promise<RecommendDataDto> {
  const response: RecommendDataDto = await fetchGet<RecommendDataDto>(
    '/game/v1/game/new-arrival/page',
    query
  );

  return response;
}
