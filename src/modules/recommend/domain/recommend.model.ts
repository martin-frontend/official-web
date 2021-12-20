import { Game } from '@/modules/game/domain/game.model';

export interface RecommendDataDto {
  content: Game[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: RecommendPageableDto;
  size: number;
  sort: RecommendSortDto;
  totalElements: number;
  totalPages: number;
}
// export interface RecommendContentDto {
//   category: string;
//   code: string;
//   id: number;
//   imageUrl: string;
//   isJackpot: false;
//   maxBet: number;
//   maxWin: number;
//   minBet: number;
//   mobileImageUrl: string;
//   name: string;
//   paylines: number;
//   providerId: number;
//   rtp: number;
//   tabletImageUrl: string;
//   triable: boolean;
// }
export interface RecommendPageableDto {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: RecommendSortDto;
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
  unpaged: boolean;
}

export interface RecommendSortDto {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
