import {
  PaymentTransactionKindOther,
  PaymentTransactionKind,
  PaymentTransactionType,
} from '../../../payment/domain/payment.model';
import { fetchGet, fetchPost } from '@/core/services/api/apiBase';
import { BalanceInfo } from '../../domain/balance';

export async function getBalanceApi(): Promise<BalanceInfo> {
  const result = await fetchGet<BalanceInfo>('/finance/v1/player/wallet');
  return result;
}

export async function getAmountApi(): Promise<number> {
  const result = await fetchGet<number>('/finance/v1/player/wallet/amount');
  return result;
}

export interface BonusDto {
  bonus: number;
  recentlyExpired: number;
  bonuses: BonusesData | null;
}
export interface BonusesData {
  amount: number;
  amountOrigin: number;
  amountUsed: number;
  expiryTime: number;
  id: string;
  kind: number;
  orderId: string;
  playerId: number;
  remark: string;
  status: number;
  time: number;
}
export async function getBonusApi(): Promise<BonusDto> {
  const result = await fetchGet<BonusDto>('/finance/v1/player/wallet/bonus');
  return result;
}

export async function getRewardApi(): Promise<number> {
  const result = await fetchGet<number>('/finance/v1/player/wallet/reward');
  return result;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transferBonuses(transferbonus: any[]) {
  return fetchPost('/finance/v1/player/wallet/bonus/transfer', transferbonus);
}

export type SearchPlayerWalletLogForm = {
  page: number;
  size: number;
  startTime: Date;
  endTime: Date;
  type?: PaymentTransactionType;
  kind?: PaymentTransactionKind;
};

export type SearchPlayerWalletLogFormOther = {
  page: number;
  size: number;
  startTime: Date;
  endTime: Date;
  type?: PaymentTransactionType;
  kind?: PaymentTransactionKindOther;
};
