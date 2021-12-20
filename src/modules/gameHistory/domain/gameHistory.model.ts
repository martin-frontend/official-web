export interface GetPaginatedBets {
  page: number;
  size: number;
  startTime: Date;
  endTime: Date;
  category?: GameTypeOption;
  gameIds?: number[];
}

export interface PaginatedBetsObject {
  bets: BetObject;
  games: GameObject[];
}

export interface GameType {
  gameTypes: GameTypesObject[];
  providers: ProvidersObject[];
}

export interface GameTypesObject {
  category: string;
  id: number;
  name: string;
  providerId: number;
}

export interface ProvidersObject {
  category: string;
  code: string;
  id: number;
  name: string;
  logoImageUrl: string;
  mobileLogoImageUrl: string;
  platform: string;
  tabletLogoImageUrl: string;
}

export interface BetObject {
  content: PaginatedBetsContent[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface GameObject {
  category: string;
  code: string;
  id: number;
  imageUrl: string;
  isJackpot: boolean;
  maxBet: number;
  maxWin: number;
  minBet: number;
  mobileImageUrl: string;
  name: string;
  paylines: number;
  providerId: number;
  rtp: number;
  tabletImageUrl: string;
  triable: boolean;
}

export interface PaginatedBetsContent {
  agentId: number;
  bet: number;
  bonus: number;
  currency: string;
  detail: number;
  freeWin: number;
  gameId: number;
  gameSessionId: string;
  id: number;
  jackpot: number;
  playerId: number;
  productId: string;
  providerId: string;
  roundId: string;
  status: number;
  time: number;
  totalWin: number;
  transactionId: string;
  transactionStatus: number;
  updateAt: number;
  validBet: number;
  win: number;
}

export enum GameTypeOption {
  SEE_ALL = -1,
  SLOT = 0,
  LIVE_CASINO = 1,
  TABLE_GAME = 2,
  SPORT = 3,
}
export enum StatusOption {
  SUCCESS = 0,
  SUCCESS_OTHER = 1,
  FAILED = 2,
}
