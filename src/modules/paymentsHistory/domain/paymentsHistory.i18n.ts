import {
  PaymentsHistoryStatus,
  WithdrawPaymentsHistoryStatus,
} from './paymentsHistory.model';

export const PAYMENT_HISTORY_KINE_I18N_KEYS: Record<
  PaymentsHistoryStatus,
  string
> = {
  [PaymentsHistoryStatus.UNFINISHED]: 'paymentshistory.status.UnFinished',
  [PaymentsHistoryStatus.FAILED]: 'paymentshistory.status.Failed',
  [PaymentsHistoryStatus.OTHEREXCEPTION]:
    'paymentshistory.status.OtherException',
  [PaymentsHistoryStatus.BUILDSIGNERROR]:
    'paymentshistory.status.BuildSignError',
  [PaymentsHistoryStatus.SIGNERROR]: 'paymentshistory.status.SignError',
  [PaymentsHistoryStatus.AMOUNTERROR]: 'paymentshistory.status.AmountError',
  [PaymentsHistoryStatus.INVALIDREQUEST]:
    'paymentshistory.status.InvalidRequest',
  [PaymentsHistoryStatus.NOTSUPPORTQUERYORDER]:
    'paymentshistory.status.NotSupportQueryOrder',
  [PaymentsHistoryStatus.ILLEGALIP]: 'paymentshistory.status.IllegalIP',
  [PaymentsHistoryStatus.TRADENOERROR]: 'paymentshistory.status.TradenoError',
  [PaymentsHistoryStatus.UNPAID]: 'paymentshistory.status.Unpaid',
  [PaymentsHistoryStatus.OK]: 'paymentshistory.status.OK',
  [PaymentsHistoryStatus.TEST]: 'paymentshistory.status.TEST',
};

export const PAYMENT_HISTORY_WITHDRAW_I18N_KEYS: Record<
  WithdrawPaymentsHistoryStatus,
  string
> = {
  [WithdrawPaymentsHistoryStatus.PENDING]:
    'paymentshistory.withdrawStatus.Pending',
  [WithdrawPaymentsHistoryStatus.PASS]: 'paymentshistory.withdrawStatus.Pass',
  [WithdrawPaymentsHistoryStatus.REFUSE]:
    'paymentshistory.withdrawStatus.Refuse',
};
