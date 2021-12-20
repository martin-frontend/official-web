import { defineStore } from 'pinia';
import { UserLimit } from '../../domain/limit';

interface LimitStoreState {
  userLimits: UserLimit[];
}

const useLimitStore = defineStore('limit', {
  state: (): LimitStoreState => ({ userLimits: [] }),
  actions: {
    setUserLimits(userLimits: UserLimit[]) {
      this.userLimits = userLimits;
    },
  },
});

export default useLimitStore;
