import { getPlayerAchievement } from '../infrastructure/api/achievementApi';
import {
  getRewardAchievementsFromDto,
  RewardAchievement,
} from '../domain/rewardAchievement';

export default async function getAchievement(): Promise<RewardAchievement[]> {
  const dto = await getPlayerAchievement();
  const achievements = getRewardAchievementsFromDto(dto);
  return achievements;
}
