export interface Game {
  category: string;
  code: string;
  id: number;
  imageUrl: string;
  isJackpot: string;
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
  favorite: boolean;
}

export enum PlayGameType {
  REAL,
  DEMO,
}
