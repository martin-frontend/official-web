import { DepositPaymentMethodDto } from '../infrastructure/api/getPaymentMethodApi';

export interface DepositPaymentMethod {
  id: number;
  name: string;
  minAmount: number;
  maxAmount: number;
  logoUrl: string;
  paymentMerchantId: string;
}

export function getDepositPaymentMethodsFromDto({
  canUse,
  paymentTypeOptions,
}: DepositPaymentMethodDto): DepositPaymentMethod[] {
  const merchantMapping = Object.fromEntries(
    canUse.map(({ paymentType, id, ...rest }) => [
      paymentType,
      { ...rest, paymentMerchantId: id },
    ])
  );

  return paymentTypeOptions
    .map(({ id, logoUrl, name }) => ({
      ...merchantMapping[id],
      logoUrl,
      id,
      name,
    }))
    .filter(({ paymentMerchantId }) => paymentMerchantId)
    .map(({ id, name, minAmount, maxAmount, logoUrl, paymentMerchantId }) => ({
      id,
      name,
      minAmount,
      maxAmount,
      logoUrl,
      paymentMerchantId,
    }));
}
