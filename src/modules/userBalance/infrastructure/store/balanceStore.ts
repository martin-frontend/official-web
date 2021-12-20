import { defineStore } from 'pinia';
import { BalanceInfo } from '../../domain/balance';
import { BonusesData } from '../api/balanceApi';

const useBalanceStore = defineStore('balance', {
  state: (): Omit<BalanceInfo, 'withdrawalLimit'> & {
    withdrawalLimit: number | null;
    expiringBonus: number;
    bonuses: BonusesData[] | null;
  } => ({
    amount: 0,
    bonus: 0,
    expiringBonus: 0,
    reward: 0,
    withdrawalLimit: null,
    bonuses: null,
  }),
  actions: {
    setAmount(amount: number) {
      this.amount = amount;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setBonuses(bonus: number, expiringBonus: number, bonuses: any) {
      this.bonus = bonus;
      this.expiringBonus = expiringBonus;
      this.bonuses = bonuses;
    },
    setReward(reward: number) {
      this.reward = reward;
    },
    setWithdrawalLimit(withdrawalLimit: number) {
      this.withdrawalLimit = withdrawalLimit;
    },
    setBalanceInfo(balanceInfo: BalanceInfo) {
      this.amount = balanceInfo.amount;
      this.bonus = balanceInfo.bonus;
      this.reward = balanceInfo.reward;
      this.withdrawalLimit = balanceInfo.withdrawalLimit;
    },
  },
});

export default useBalanceStore;
