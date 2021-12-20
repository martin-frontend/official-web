import {
  WithdrawalPaymentMethod,
  getWithdrawalPaymentMethodsFromDto,
} from '../domain/paymentMethods';
import getApiPaymentMethodDto from '../infrastructure/api/getPaymentMethodApi';

export async function getWithdrawalPaymentMethod(): Promise<
  WithdrawalPaymentMethod[]
> {
  const dto = await getApiPaymentMethodDto();
  return getWithdrawalPaymentMethodsFromDto(dto);
}
