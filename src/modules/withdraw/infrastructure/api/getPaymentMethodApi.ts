import { fetchGet, fetchPost } from '@/core/services/api/apiBase';

export interface WithdrawalPaymentMethodDto {
  canUse: CanUse[];
  withdrawalTypeOptions: WithdrawalTypeOptions[];
}

export interface CanUse {
  enabled: boolean;
  channelEnabled: boolean;
  providerEnabled: boolean;
  rank: number;
  channelRank: number;
  providerRank: number;
  withdrawalType: number;
  id: string;
  name: string;
  providerId: string;
  withdrawalChannel: string;
  maxAmount: number;
  minAmount: number;
}

export interface WithdrawalTypeOptions {
  id: number;
  name: string;
  kind: number;
  rank: number;
  logoUrl: string;
  tabletLogoUrl: string;
  mobileLogoUrl: string;
  display: boolean;
  minProcessingTime: number;
  processingTime: number;
  minAmount: number;
  maxAmount: number;
}

export default async function getApiPaymentMethodDto(): Promise<WithdrawalPaymentMethodDto> {
  const response: WithdrawalPaymentMethodDto =
    await fetchGet<WithdrawalPaymentMethodDto>(
      '/finance/v1/withdrawal/merchant/use'
    );

  return response;
}

export async function withdrawalPasswordVerification(
  password: string
): Promise<string> {
  const response = await fetchPost<string>(
    '/finance/v1/withdrawal/password/valid',
    { withdrawalPassword: password }
  );

  return response;
}

export interface CreatePaymentApplicationFormDto {
  amount: number;
  withdrawalPassword: string;
  withdrawalType: number;
}
export async function createPaymentApplicationForm(
  createPaymentApplicationFormDto: CreatePaymentApplicationFormDto
): Promise<string> {
  const response = await fetchPost<string>(
    '/finance/v1/withdrawal/apply',
    createPaymentApplicationFormDto
  );

  return response;
}

export function setupWithdrawPassword(dto: {
  password: string;
  token: string;
}) {
  return fetchPost<string>('/official/v1/player/withdrawal-password', dto);
}
