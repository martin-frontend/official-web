import { defineStore } from 'pinia';

export interface SignUpStoreState {
  isSignUpDialogShown: boolean;
}

const useSignUpStore = defineStore('signUp', {
  state: () => ({ isSignUpDialogShown: false }),
  actions: {
    setIsSignUpDialogShown(isSignUpDialogShown: boolean) {
      this.isSignUpDialogShown = isSignUpDialogShown;
    },
  },
});

export default useSignUpStore;
