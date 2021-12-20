import { fetchGet, fetchPost } from '@/core/services/api/apiBase';

export interface AchievementDto {
  achievements: Achievement[];
  playerAchievements: PlayerAchievement[];
}

export interface ReceiveDto {
  id: number;
  rewardAmount: number;
  rewardReceivedAt: number;
}

export interface Achievement {
  description: string;
  id: number;
  imageUrl: string;
  mobileImageUrl: string;
  rewardAmount: number;
  tabletImageUrl: string;
  target: number;
  targetAmount: number;
  title: string;
}

export interface PlayerAchievement {
  achievementId: number;
  completedAt: number | null;
  currentAmount: number;
  rewardReceivedAt: number | null;
}

export async function getPlayerAchievement(): Promise<AchievementDto> {
  const result = await fetchGet<AchievementDto>(
    '/official/v1/player/achievement'
  );
  return result;
}

export async function receiveRewards(
  achievementId: number
): Promise<ReceiveDto> {
  const result = await fetchPost<ReceiveDto>(
    '/official/v1/player/achievement/receive',
    undefined,
    {
      achievementId,
    }
  );
  return result;
}

// export function transferRewards(dto: TransferReward) {
//   return fetchPost('/finance/v1/player/wallet/reward/transfer', dto);
// }

export function transferRewards(transferReward: number) {
  return fetchPost('/finance/v1/player/wallet/reward/transfer', transferReward);
}

export interface TransferRule {
  type: number;
  amountDivisionRate: number;
  withdrawalLimitRate: number;
}
export function getTransferRule(): Promise<TransferRule[]> {
  return fetchGet('/finance/v1/player/wallet/transfer/rule/all');
}
