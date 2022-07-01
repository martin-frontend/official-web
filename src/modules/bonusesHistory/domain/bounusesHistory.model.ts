export interface BonusesHistory {
  afterAmount: number;
  amount: number;
  beforeAmount: number;
  id: number;
  item: string;
  kind: string;
  orderId: string;
  playerId: number;
  remark: string;
  time: number;
  type: number;
  day: number;
  bonusIdsKind: number;
  bonusIdsOrderId: string;
  expiryDate: number;
  activityName: string;
  acceptedTime: string;
  activityEndTime: string;
  activityType: string;
  activityTarget: string;
  dateAndTime: string;
  transferedBonusId: string[];
}

// export interface BonusesHistoryObject {
//   content: BonusesHistory[];
//   first: boolean;
//   last: boolean;
//   number: number;
//   numberOfElements: number;
//   size: number;
//   totalElements: number;
//   totalPages: number;
//   page: number;
// }
export interface BonusesHistoryDetails {
  afterAmount: number;
  amount: number;
  beforeAmount: number;
  id: number;
  logId: number;
  logTime: number;
  orderId: string;
  remark: string;
}
export interface BonusesHistoryPage {
  content: BonusesHistory[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface GetBonusesHistoryDto {
  page: number;
  size: number;
  startTime: Date;
  endTime: Date;
  type: number;
}

export enum BonusesHistoryStatus {
  SYSTEN = 0,
  PAYMENT = 1,
  WITHDRAW = 2,
  ACCOUNTING_ADJUSTMENT = 3,
  GAME = 4,
  ACHIEVEMENT = 5,
  ACTIVITY = 6,
  WALLET_TRANSFER = 7,
  LEVEL = 8,
}

export type SearchCompletedUserEventForm = {
  startDate: Date;
  endDate: Date;
  page: number;
};

export interface ActivityDto {
  agentPlayer: boolean;
  amount: number;
  autoReceiveBonus: boolean;
  betAmount: number;
  betConsecutiveTimes: number;
  bonusAmount: number;
  bonusExpirationLimit: number;
  bonusReceptionLimit: number;
  consecutiveDays: number;
  createdBy: number;
  cumulativeBetAmount: number;
  cumulativeWinAmount: number;
  description: string;
  endDate: number;
  gameCategories: string[];
  // gameFeatureIds: [0];
  // gameIds: [0];
  // gameTypeIds: [0];
  id: number;
  imageUrl: string;
  mobileImageUrl: string;
  normalPlayer: boolean;
  officialTestPlayer: boolean;
  reacceptable: boolean;
  recommendedPlayer: boolean;
  remainAmount: number;
  startDate: number;
  status: string;
  subtitle: string;
  tabletImageUrl: string;
  title: string;
  winAmount: number;
  winConsecutiveTimes: number;
}
export interface PlayerActivityDto {
  acceptedAt: number;
  activityId: number;
  agentId: number;
  bonusAmount: number;
  bonusReceivedAt: number;
  completedAt: number;
  id: number;
  playerActivityDetails: [
    {
      betFulfill: boolean;
      completed: boolean;
      currentCumulativeBetAmount: number;
      currentCumulativeWinAmount: number;
      day: number;
      id: number;
      playerActivityId: number;
      winFulfill: boolean;
    }
  ];
  playerId: number;
  transactionStatus: string;
}

export interface ActivityId {
  id: number | string;
}

export interface Ids {
  ids: string[];
}
export interface ActivityOrderId {
  id: string;
}
export interface LevelOrderId {
  level: string;
}

export interface BonusesIdsData {
  id: string;
  time: number;
  playerId: number;
  kind: number;
  orderId: string;
  amount: number;
  amountUsed: number;
  amountOrigin: number;
  expiryTime: number;
  status: number;
  remark: string;
}
