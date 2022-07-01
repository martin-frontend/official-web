import useUserStore from '@/modules/user/Infrastructure/store/userStore';
import {
  getLevelOptionsApi,
  getCurrentLevelStatistic,
} from '@/modules/level/infrastructure/api/level.api';
// eslint-disable-next-line import/no-cycle
import useLevelStore, {
  LevelStoreState,
} from '@/modules/level/infrastructure/store/levelStore';
import { percentage } from '@/libs/percentage';

export async function initLevelOptions() {
  const levelStore = useLevelStore();

  const options = await getLevelOptionsApi();

  levelStore.setOptions(options);
}

export async function updateLevelStatistic() {
  const levelStore = useLevelStore();

  const statistic = await getCurrentLevelStatistic();

  levelStore.setStatistic(statistic);
}

export function converToLevelProgress(state: LevelStoreState) {
  const { userInfo } = useUserStore();

  const { statistic, options } = state;

  if (!userInfo || !statistic || !options) return 0;

  const { level: curLevel } = userInfo;

  const curLevelStatistic = options.find(({ level }) => level === curLevel);

  const nextLevelStatistic = options.find(({ level }) => level > curLevel);

  if (!nextLevelStatistic) return 100;

  let taskCount = 4;

  if (curLevelStatistic?.depositTimes === nextLevelStatistic?.depositTimes) {
    taskCount -= 1;
  }

  if (
    curLevelStatistic?.cumulativeDepositAmount ===
    nextLevelStatistic?.cumulativeDepositAmount
  ) {
    taskCount -= 1;
  }

  if (
    curLevelStatistic?.cumulativeValidBetAmount ===
    nextLevelStatistic?.cumulativeValidBetAmount
  ) {
    taskCount -= 1;
  }

  if (curLevelStatistic?.depositAmount === nextLevelStatistic?.depositAmount) {
    taskCount -= 1;
  }

  if (taskCount === 0) return 100;

  const {
    cumulativeDepositAmount,
    cumulativeValidBetAmount,
    depositAmount,
    depositTimes,
  } = nextLevelStatistic;

  const {
    cumulativeDepositAmount: curCumulativeDepositAmount,
    cumulativeDepositTimes: curCumulativeDepositTimes,
    cumulativeValidBetAmount: curCumulativeValidBetAmount,
    maxDepositAmount: curMaxDepositAmount,
  } = statistic;

  const depositAmountPercentage = percentage(
    curMaxDepositAmount,
    depositAmount
  );

  const timesPercentage = percentage(curCumulativeDepositTimes, depositTimes);

  const validBetAmountPercentage = percentage(
    curCumulativeValidBetAmount,
    cumulativeValidBetAmount
  );

  const cumulativeDepositAmountPercentage = percentage(
    curCumulativeDepositAmount,
    cumulativeDepositAmount
  );

  console.log(
    depositAmountPercentage,
    timesPercentage,
    validBetAmountPercentage,
    cumulativeDepositAmountPercentage,
    taskCount
  );

  return Math.floor(
    (depositAmountPercentage +
      timesPercentage +
      validBetAmountPercentage +
      cumulativeDepositAmountPercentage) /
      taskCount
  );
}
