import { defineStore } from 'pinia';

interface LoginStoreState {
  isLoginDialogShown: boolean;
  email: string;
  password: string;
}

const useLoginStore = defineStore('login', {
  state: (): LoginStoreState => ({
    isLoginDialogShown: false,
    email: '',
    password: '',
  }),
  actions: {
    setIsLoginDialogShown(isLoginDialogShown: boolean) {
      this.isLoginDialogShown = isLoginDialogShown;
    },
  },
});

export default useLoginStore;
