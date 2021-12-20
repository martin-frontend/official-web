import { defineStore } from 'pinia';

interface ToastStoreState {
  toastContent: ToastDto[];
  timeIdArr: number[];
}

interface ToastDto {
  toastTitle: string;
  toastDescription: string;

  color: TypographyColor;
  isIconInfoCircle: boolean;
  isIconCheckCircle: boolean;
  isIconBan: boolean;
  toastId: number;
}

export const defaultToast: ToastDto = {
  toastTitle: '',
  toastDescription: '',
  color: 'danger',
  isIconInfoCircle: false,
  isIconCheckCircle: false,
  isIconBan: false,
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
      const index = this.toastContent.push(toast);

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
