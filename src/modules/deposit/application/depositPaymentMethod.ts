import {
  DepositPaymentMethod,
  getDepositPaymentMethodsFromDto,
} from '../domain/paymentMethods';
import getApiPaymentMethodDto from '../infrastructure/api/getPaymentMethodApi';

export async function getDepositPaymentMethod(): Promise<
  DepositPaymentMethod[]
> {
  const dto = await getApiPaymentMethodDto();
  return getDepositPaymentMethodsFromDto(dto);
}
