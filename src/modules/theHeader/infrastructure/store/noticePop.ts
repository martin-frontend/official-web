import { defineStore } from 'pinia';

interface OpenNoticePopStoreState {
  isNoticePopShown: boolean;
}

const useNoticePopStore = defineStore('OpenNoticePop', {
  state: (): OpenNoticePopStoreState => ({
    isNoticePopShown: false,
  }),
  actions: {
    setIsNoticePopShown(isNoticePopShown: boolean) {
      this.isNoticePopShown = isNoticePopShown;
    },
  },
});

export default useNoticePopStore;
