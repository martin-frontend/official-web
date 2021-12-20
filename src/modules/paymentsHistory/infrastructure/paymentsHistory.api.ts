import moment from 'moment';
import {
  PaymentsHistoryObject,
  GetPaymentsHistoryDto,
  GetWithdrawPaymentsHistoryDto,
  WithdrawalObject,
  PaymentType,
} from '../domain/paymentsHistory.model';
import { fetchGet } from '@/core/services/api/apiBase';

export function getPaymentsHitory(
  dto: GetPaymentsHistoryDto
): Promise<PaymentsHistoryObject> {
  return fetchGet('/finance/v1/payment/order/page', {
    ...dto,
    startTime: moment(dto.startTime).startOf('day').valueOf(),
    endTime: moment(dto.endTime).endOf('day').valueOf(),
  });
}

export function getWithdrawPaymentsHitory(
  dto: GetWithdrawPaymentsHistoryDto
): Promise<{
  withdrawalApplies: WithdrawalObject;
  withdrawalOrders: WithdrawalObject;
}> {
  return fetchGet('/finance/v1/withdrawal/apply/page', {
    ...dto,
    startTime: moment(dto.startTime).startOf('day').valueOf(),
    endTime: moment(dto.endTime).endOf('day').valueOf(),
  });
}

export function getPaymentOption(): Promise<PaymentType[]> {
  return fetchGet('/finance/v1/payment/type/options');
}
