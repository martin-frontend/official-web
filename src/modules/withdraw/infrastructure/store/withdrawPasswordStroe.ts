import { defineStore } from 'pinia';
import { WithdrawalPaymentMethod } from '../../domain/paymentMethods';

export enum DialogType {
  SetupWithdrawPassword,
  VerifyYourMobileNumber,
  WithdrawPassword,
  WithdrawalInformation,
  LostYourPassword,
  NewPassword,
}

interface WithdrawPasswordStoreState {
  isShown: boolean;
  title: string;
  isWithdrawPasswordInputShown: boolean;
  isInformationInputShown: boolean;
  isLostPasswordShown: boolean;
  confirmButtonText: string;
  curDialogType: DialogType;
  logoUrl: string;
  name: string;
  id: number;
  amount: number;
  withdrawalPassword: string;
  zIndex?: number;
}

const useWithdrawPasswordStore = defineStore('withdrawPassword', {
  state: (): WithdrawPasswordStoreState => ({
    isShown: false,
    title: '',
    isWithdrawPasswordInputShown: false,
    isInformationInputShown: false,
    isLostPasswordShown: false,
    confirmButtonText: '',
    curDialogType: DialogType.SetupWithdrawPassword,
    logoUrl: '',
    name: '',
    id: 0,
    amount: 0,
    withdrawalPassword: '',
    zIndex: -1,
  }),
  actions: {
    popUp({
      title,
      isWithdrawPasswordInputShown,
      isInformationInputShown,
      isLostPasswordShown,
      confirmButtonText,
      curDialogType,
      amount,
    }: Partial<Omit<WithdrawPasswordStoreState, 'isShown'>>) {
      if (title) this.title = title;
      if (confirmButtonText) this.confirmButtonText = confirmButtonText;
      if (isWithdrawPasswordInputShown)
        this.isWithdrawPasswordInputShown = isWithdrawPasswordInputShown;

      if (isInformationInputShown)
        this.isInformationInputShown = isInformationInputShown;

      if (isLostPasswordShown) this.isLostPasswordShown = isLostPasswordShown;
      if (curDialogType) this.curDialogType = curDialogType;
      if (amount) this.amount = amount;
      this.isShown = true;
      this.zIndex = 9999;
    },

    setValue(value: WithdrawalPaymentMethod) {
      const { logoUrl, name, id } = value;
      this.id = id;
      this.logoUrl = logoUrl;
      this.name = name;
    },

    close() {
      this.isShown = false;
      setTimeout(() => {
        this.$reset();
      }, 300);
    },
  },
});

export default useWithdrawPasswordStore;
