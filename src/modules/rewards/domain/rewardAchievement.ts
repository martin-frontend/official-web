// eslint-disable-next-line import/no-cycle
import { AchievementDto } from '../infrastructure/api/achievementApi';

export interface RewardAchievement {
  description: string;
  id: number;
  imageUrl: string;
  mobileImageUrl: string;
  tabletImageUrl: string;
  rewardAmount: number;
  target: number;
  targetAmount: number;
  title: string;
  completed: boolean;
  currentAmount: number;
  rewardReceived: boolean;
}

export enum AchievementGrandType {
  'CUMULATIVE_DEPOSIT_TIMES' = 101,
  'CUMULATIVE_DEPOSIT_AMOUNT' = 102,
  'CUMULATIVE_BET_AMOUNT' = 103,
  'CUMULATIVE_LAUNCH_GAME_TIMES' = 104,
  'CUMULATIVE_LOGIN_TIMES' = 105,
  'CUMULATIVE_ACHIEVEMENT_COMPLETED_TIMES' = 106,
  'CONSECUTIVE_LOGIN_DAYS' = 201,
  'CONSECUTIVE_DEPOSIT_DAYS' = 202,
  'CONSECUTIVE_LAUNCH_GAME_DAYS' = 203,
}

export enum AchievementBasicType {
  'NAME_FILLING' = 1,
  'PHONE_VERIFICATION' = 2,
  'EMAIL_VERIFICATION' = 3,
  'DEPOSIT' = 4,
  'WITHDRAWAL' = 5,
  'CREDIT_CARD_BINDING' = 6,
  'WITHDRAWAL_PASSWORD_SETTING' = 7,
}

export const achievementGameType = [104, 203];
export const achievementDepositType = [101, 102, 202];
export const achievementAccumulateBet = [103];
export const achievementSpecialAccumulate = [105, 106, 201];

export function getRewardAchievementsFromDto({
  achievements,
  playerAchievements,
}: AchievementDto): RewardAchievement[] {
  const playerAchievementsIdArr = playerAchievements.map(
    ({ achievementId }) => achievementId
  );
  const rewardAchievement = achievements.map((achievement) => {
    const filterIndex = playerAchievementsIdArr.indexOf(achievement.id);
    if (filterIndex !== -1) {
      const { completedAt, currentAmount, rewardReceivedAt } =
        playerAchievements[filterIndex];
      return Object.assign(achievement, {
        completed: !!completedAt,
        rewardReceived: !!rewardReceivedAt,
        currentAmount,
      });
    }

    return Object.assign(achievement, {
      completed: false,
      currentAmount: 0,
      rewardReceived: false,
    });
  });

  return rewardAchievement;
}
