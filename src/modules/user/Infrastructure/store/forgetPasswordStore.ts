import { defineStore } from 'pinia';

interface ForgetPasswordStoreState {
  isForgetPasswordDialogShown: boolean;
}

const useForgetPasswordStore = defineStore('forgetPassword', {
  state: (): ForgetPasswordStoreState => ({
    isForgetPasswordDialogShown: false,
  }),
  actions: {
    setIsForgetPasswordDialogShown(isForgetPasswordDialogShown: boolean) {
      this.isForgetPasswordDialogShown = isForgetPasswordDialogShown;
    },
  },
});

export default useForgetPasswordStore;
