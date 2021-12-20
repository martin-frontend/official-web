import {
  getBalanceApi,
  getAmountApi,
  getBonusApi,
  getRewardApi,
} from '../infrastructure/api/balanceApi';
import useBalanceStore from '../infrastructure/store/balanceStore';

export async function updateBalance(): Promise<void> {
  const balanceStore = useBalanceStore();

  const balance = await getBalanceApi();
  balanceStore.setBalanceInfo(balance);
}

export async function updateAmount(): Promise<void> {
  const balanceStore = useBalanceStore();

  const amount = await getAmountApi();

  if (amount === balanceStore.amount) return;
  balanceStore.setAmount(amount);
}

export async function updateBonuses() {
  const balanceStore = useBalanceStore();

  const { bonus, recentlyExpired, bonuses } = await getBonusApi();
  balanceStore.setBonuses(bonus, recentlyExpired, bonuses);
}

export async function updateRewards() {
  const balanceStore = useBalanceStore();

  const reward = await getRewardApi();
  balanceStore.setReward(reward);
}

export function getWithdrawableBalanceValue(
  amount: number,
  withdrawalLimit: number | null
): number {
  if (withdrawalLimit === null) {
    return 0;
  }
  const withdrawableBalance = amount - (withdrawalLimit || 0);

  return withdrawableBalance > 0 ? withdrawableBalance : 0;
}
