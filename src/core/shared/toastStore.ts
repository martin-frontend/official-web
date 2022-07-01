import { defineStore } from 'pinia';

interface ToastStoreState {
  toastContent: ToastDto[];
  timeIdArr: number[];
}

export interface ToastDto {
  toastTitle?: string;
  toastDescription?: string;
  color?: TypographyColor;
  isIconInfoCircle?: boolean;
  isIconCheckCircle?: boolean;
  isIconBan?: boolean;
  isIconError?: boolean;
  toastId?: number;
}

export const defaultToast: ToastDto = {
  toastTitle: '',
  toastDescription: '',
  color: 'success',
  isIconInfoCircle: false,
  isIconCheckCircle: false,
  isIconBan: false,
  isIconError: false,
  toastId: 0,
};

export type TypographyColor = 'success' | 'danger' | 'accent';

const useToastStore = defineStore('toast', {
  state(): ToastStoreState {
    return {
      toastContent: [],
      timeIdArr: [],
    };
  },
  actions: {
    addToastMessage(toast: ToastDto) {
      // index 會從1開始
      const index = this.toastContent.push({ ...defaultToast, ...toast });

      const contentIndex = index - 1;

      const timeId = setTimeout(() => {
        this.closeToastMessage(timeId);
      }, 3000);

      this.toastContent[contentIndex].toastId = timeId;

      this.timeIdArr.push(timeId);
    },

    closeToastMessage(id: number) {
      const findIdFun = ({ toastId }: ToastDto) => toastId === id;

      const index = this.toastContent.findIndex(findIdFun);

      this.toastContent.splice(index, 1);

      clearTimeout(this.timeIdArr[index]);
      this.timeIdArr.splice(index, 1);
    },
    // close() {
    //     this.$reset();
    // },
  },
});

export default useToastStore;
