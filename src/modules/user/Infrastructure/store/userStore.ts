import { defineStore } from 'pinia';
import { UserInfo } from '../../domain/user.model';

interface UserStoreState {
  userInfo: UserInfo | null;
}

const useUserStore = defineStore('users', {
  state: (): UserStoreState => ({ userInfo: null }),
  actions: {
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo;
    },
  },
});

export default useUserStore;
