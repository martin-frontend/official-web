import { fetchGet } from '@/core/services/api/apiBase';

export interface DepositPaymentMethodDto {
  canUse: CanUse[];
  paymentTypeOptions: PayTypeOption[];
}

export interface CanUse {
  channelEnabled: boolean;
  channelRank: number;
  enabled: boolean;
  id: string;
  maxAmount: number;
  minAmount: number;
  name: string;
  paymentChannel: string;
  paymentType: number;
  providerEnabled: boolean;
  providerId: string;
  providerRank: number;
  rank: number;
}

export interface PayTypeOption {
  display: boolean;
  id: number;
  kind: number;
  logoUrl: string;
  maxAmount: number;
  minAmount: number;
  minProcessingTime: number;
  mobileLogoUrl: string;
  name: string;
  processingTime: number;
  rank: number;
  tabletLogoUrl: string;
}

export default async function getApiPaymentMethodDto(): Promise<DepositPaymentMethodDto> {
  const response: DepositPaymentMethodDto =
    await fetchGet<DepositPaymentMethodDto>('/finance/v1/payment/merchant/use');

  return response;
}
