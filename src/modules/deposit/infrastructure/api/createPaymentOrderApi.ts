import { fetchPost } from '@/core/services/api/apiBase';

export interface CreatePaymentOrderBody {
  amount: number;
  bankCode?: string;
  paymentMerchantId: string;
  remark?: string;
  returnUrl?: string;
}

export interface CreatePaymentOrderResponse {
  method: string;
  param: Record<string, string>;
  type: string;
  url: string;
}

export default async function createPaymentOrderApi(
  body: CreatePaymentOrderBody
): Promise<CreatePaymentOrderResponse> {
  const response = await fetchPost<CreatePaymentOrderResponse>(
    '/finance/v1/payment/order/create',
    body
  );

  return response;
}
