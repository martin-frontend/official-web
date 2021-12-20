/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';

interface DialogStoreState {
  isShown: boolean;
  title: string;
  message: string;
  secondMessage: string;
  cancelButtonText: string;
  isCancelButtonShown: boolean;
  onCancel: null | ((...args: any[]) => void);
  okButtonText: string;
  isOkButtonShown: boolean;
  onOk: null | ((...args: any[]) => void);
  isCoinShown?: boolean;
  isCheckShown?: boolean;
  okOtherButtonText: string;
  isOtherOkButtonShown: boolean;
  onOtherOk: null | ((...args: any[]) => void);
  isClockShown?: boolean;
}

const useDialogStore = defineStore('dialog', {
  state(): DialogStoreState {
    return {
      isShown: false,
      title: '',
      message: '',
      cancelButtonText: 'cancel',
      isCancelButtonShown: true,
      onCancel: null,
      okButtonText: 'ok',
      isOkButtonShown: true,
      onOk: null,
      isCoinShown: false,
      isCheckShown: false,
      secondMessage: '',
      isClockShown: false,
      okOtherButtonText: 'ok',
      isOtherOkButtonShown: false,
      onOtherOk: null,
    };
  },
  actions: {
    popUp({
      title,
      message,
      secondMessage,
      cancelButtonText,
      isCancelButtonShown,
      onCancel,
      okButtonText,
      isOkButtonShown,
      isCoinShown,
      isCheckShown,
      isClockShown,
      onOk,
      onOtherOk,
      okOtherButtonText,
      isOtherOkButtonShown,
    }: Partial<Omit<DialogStoreState, 'isShown'>>) {
      if (title) this.title = title;
      if (message) this.message = message;
      if (secondMessage) this.secondMessage = secondMessage;
      if (cancelButtonText) this.cancelButtonText = cancelButtonText;
      if (isCancelButtonShown !== undefined)
        this.isCancelButtonShown = isCancelButtonShown;
      if (onCancel) this.onCancel = onCancel;
      if (okButtonText) this.okButtonText = okButtonText;
      if (isOkButtonShown !== undefined) this.isOkButtonShown = isOkButtonShown;
      if (onOk) this.onOk = onOk;
      if (okOtherButtonText) this.okOtherButtonText = okOtherButtonText;
      if (isOtherOkButtonShown !== undefined)
        this.isOtherOkButtonShown = isOtherOkButtonShown;
      if (onOtherOk) this.onOtherOk = onOtherOk;
      if (isCoinShown) this.isCoinShown = isCoinShown;
      if (isCheckShown) this.isCheckShown = isCheckShown;
      if (isClockShown) this.isClockShown = isClockShown;
      this.isShown = true;
    },
    close() {
      this.$reset();
    },
  },
});

export default useDialogStore;
