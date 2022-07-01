export interface LevelOption {
  bonusAmount: number;
  cumulativeDepositAmount: number;
  cumulativeValidBetAmount: number;
  depositAmount: number;
  depositTimes: number;
  imageUrl: string;
  level: number;
  mobileImageUrl: string;
  name: string;
  tabletImageUrl: string;
}

export interface LevelStatistic {
  cumulativeDepositAmount: number;
  cumulativeDepositTimes: number;
  cumulativeValidBetAmount: number;
  maxDepositAmount: number;
}
