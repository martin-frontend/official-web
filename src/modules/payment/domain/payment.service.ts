import { getPaymentOptions as getPaymentOptionsFromApi } from '@/modules/payment/infrastructure/payment.api';
import {
  getPaymentOptions as getPaymentOptionsFromStore,
  setPaymentOptions,
} from '@/modules/payment/infrastructure/payment.store';

export async function getPaymentOptionsAndStore() {
  let options = getPaymentOptionsFromStore();

  if (!options) {
    options = await getPaymentOptionsFromApi();
    setPaymentOptions(options);
  }
}
