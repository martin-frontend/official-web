import { createUrlWithParams } from '../domain/handle3rdPartyResponse';
import createPaymentOrderApi from '../infrastructure/api/createPaymentOrderApi';

export async function createPaymentOrder(
  amount: number,
  paymentMerchantId: string
): Promise<string> {
  const { method, type, param, url } = await createPaymentOrderApi({
    amount,
    paymentMerchantId,
  });

  if (method === 'GET' && type === 'form') {
    return createUrlWithParams(url, param);
  }
  if (type === 'link') {
    return url;
  }
  return '';
}
