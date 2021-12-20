import { defineStore } from 'pinia';
import { PaymentOption } from '../domain/payment.model';

interface PaymentStoreState {
  options: PaymentOption[] | null;
}

const usePaymentStore = defineStore<'payment', PaymentStoreState>('payment', {
  state: () => ({
    options: null,
  }),
});

export function getPaymentOptions(): PaymentOption[] | null {
  return usePaymentStore().options;
}
export function getWithdrawalMethods(): PaymentOption[] | null {
  return usePaymentStore().options;
}

export function getPaymentOptionsBySupport(): PaymentOption[] | null {
  const options = getPaymentOptions();
  return options;

  // if (!options || support === PaymentSupport.ALL) {
  //   return options;
  // }

  // return options.filter(
  //   (option) =>
  //     option.support === PaymentSupport.ALL || option.support === support
  // );
}

export function setPaymentOptions(options: PaymentOption[]) {
  usePaymentStore().options = options;
}
