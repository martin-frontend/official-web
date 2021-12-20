import { onMounted, computed } from 'vue';
import { getPaymentOptionsAndStore } from '@/modules/payment/domain/payment.service';
import {
  getPaymentOptions,
  getWithdrawalMethods,
} from '@/modules/payment/infrastructure/payment.store';
// import { PaymentSupport } from '../domain/payment.model';

export function usePaymentOptions() {
  // const paymentOptions = computed(() => getPaymentOptionsBySupport());
  // const withdrawOptions = computed(() => getPaymentOptionsBySupport());
  const paymentOptions = computed(() => getPaymentOptions());
  const withdrawOptions = computed(() => getWithdrawalMethods());

  onMounted(() => {
    getPaymentOptionsAndStore();
  });

  return {
    paymentOptions,
    withdrawOptions,
  };
}
