import moment from 'moment';
import {
  GetPaymentTransactionsDtoOther,
  GetPaymentTransactionsDto,
  PaymentOption,
  PaymentTransactionObject,
  PlayerAchievementDto,
  AchievementId,
  AchievementDto,
  PaymentsHistoryOrderId,
  ApplyId,
  OrderNo,
  AccountingAdjustment,
  RebateId,
  Rebate,
} from '../domain/payment.model';

import { fetchGet } from '@/core/services/api/apiBase';
import {
  PaymentsHistory,
  WithdrawPaymentsHistory,
} from '@/modules/paymentsHistory/domain/paymentsHistory.model';

export function getPaymentOptions(): Promise<PaymentOption[]> {
  return fetchGet<PaymentOption[]>('/finance/v1/payment/type/options');
}
export function getWithdrawalMethods(): Promise<PaymentOption[]> {
  return fetchGet<PaymentOption[]>('/finance/v1/withdrawal/type/options');
}

export function getPaymentTransactions(
  dto: GetPaymentTransactionsDto
): Promise<PaymentTransactionObject> {
  return fetchGet('/finance/v1/player/wallet/log/page', {
    ...dto,
    page: dto.page - 1,
    startTime: moment(dto.startTime).startOf('day').valueOf(),
    endTime: moment(dto.endTime).endOf('day').valueOf(),
    type: 0,
  });
}

export function getPaymentTransactionsOther(
  dto: GetPaymentTransactionsDtoOther
): Promise<PaymentTransactionObject> {
  return fetchGet('/finance/v1/player/wallet/log/page', {
    ...dto,
    page: dto.page - 1,
    startTime: moment(dto.startTime).startOf('day').valueOf(),
    endTime: moment(dto.endTime).endOf('day').valueOf(),
  });
}

export function getAchievementDetail(dto: AchievementId): Promise<{
  achievementDto: AchievementDto;
  playerAchievementDto: PlayerAchievementDto;
}> {
  return fetchGet('/official/v1/player/achievement/detail', dto);
}

export function getAchievementCategoriesMapping() {
  return fetchGet<Record<string, Record<string, string>>>(
    '/official/v1/achievement/categories'
  );
}
export function getPaymentsHistoryDetail(
  dto: PaymentsHistoryOrderId
): Promise<PaymentsHistory> {
  return fetchGet<PaymentsHistory>('/finance/v1/payment/order', dto);
}
export function getWithdrawPaymentsHistoryDetail(
  dto: ApplyId
): Promise<WithdrawPaymentsHistory> {
  return fetchGet('/finance/v1/withdrawal/apply', dto);
}

export function getAccountingAdjustmentDetail(
  dto: OrderNo
): Promise<AccountingAdjustment> {
  return fetchGet('/finance/v1/accounting-adjustment/order', dto);
}

export function getRebateDetail(dto: RebateId): Promise<Rebate> {
  return fetchGet('/finance/v1/rebate/id', dto);
}
