import { defineStore } from 'pinia';
import { PlayerReferralDto } from '../../domain/referFriend.model';

const useReferFriendStore = defineStore('referFriendStore', {
  state(): PlayerReferralDto {
    return {
      completedCount: 0,
      notCompletedCount: 0,
      promoCode: '',
      totalReceivedReward: 0,
      requirementBetAmount: 0,
      requirementDeadline: 0,
      requirementDepositAmount: 0,
      reward: 0,
    };
  },
  actions: {
    update({
      completedCount,
      notCompletedCount,
      promoCode,
      totalReceivedReward,
      requirementBetAmount,
      requirementDeadline,
      requirementDepositAmount,
      reward,
    }: PlayerReferralDto) {
      this.completedCount = completedCount;
      this.notCompletedCount = notCompletedCount;
      this.promoCode = promoCode;
      this.totalReceivedReward = totalReceivedReward;
      this.requirementBetAmount = requirementBetAmount;
      this.totalReceivedReward = totalReceivedReward;
      this.requirementDeadline = requirementDeadline;
      this.requirementDepositAmount = requirementDepositAmount;
      this.reward = reward;
    },
    close() {
      this.$reset();
    },
  },
});
export default useReferFriendStore;
