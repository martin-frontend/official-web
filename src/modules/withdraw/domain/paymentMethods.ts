import { WithdrawalPaymentMethodDto } from '../infrastructure/api/getPaymentMethodApi';

export interface WithdrawalPaymentMethod {
  id: number;
  name: string;
  minAmount: number;
  maxAmount: number;
  logoUrl: string;
  paymentMerchantId: string;
}

export function getWithdrawalPaymentMethodsFromDto({
  canUse,
  withdrawalTypeOptions,
}: WithdrawalPaymentMethodDto): WithdrawalPaymentMethod[] {
  const merchantMapping = Object.fromEntries(
    canUse.map(({ withdrawalType, id, ...rest }) => [
      withdrawalType,
      { ...rest, paymentMerchantId: id },
    ])
  );

  return withdrawalTypeOptions
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
