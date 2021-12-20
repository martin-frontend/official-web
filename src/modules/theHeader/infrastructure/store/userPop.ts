import { defineStore } from 'pinia';

interface OpenUserPopStoreState {
  isUserPopShown: boolean;
}

const useUserPopStore = defineStore('OpenUserPop', {
  state: (): OpenUserPopStoreState => ({
    isUserPopShown: false,
  }),
  actions: {
    setIsUserPopShown(isUserPopShown: boolean) {
      this.isUserPopShown = isUserPopShown;
    },
  },
});

export default useUserPopStore;
