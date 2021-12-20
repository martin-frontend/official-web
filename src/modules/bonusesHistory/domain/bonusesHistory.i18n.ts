import { BonusesHistoryStatus } from './bounusesHistory.model';

export const BONUSES_HISTORY_KINE_I18N_KEYS: Record<
  BonusesHistoryStatus,
  string
> = {
  [BonusesHistoryStatus.SYSTEN]: 'bonusesHistory.status.System',
  [BonusesHistoryStatus.PAYMENT]: 'bonusesHistory.status.Deposit',
  [BonusesHistoryStatus.WITHDRAW]: 'bonusesHistory.status.Withdraw',
  [BonusesHistoryStatus.ACCOUNTING_ADJUSTMENT]:
    'bonusesHistory.status.Reconciliation',
  [BonusesHistoryStatus.GAME]: 'bonusesHistory.status.Game',
  [BonusesHistoryStatus.ACHIEVEMENT]: 'bonusesHistory.status.Task',
  [BonusesHistoryStatus.ACTIVITY]: 'bonusesHistory.status.Activity',
  [BonusesHistoryStatus.WALLET_TRANSFER]:
    'bonusesHistory.status.WalletTransfer',
  [BonusesHistoryStatus.LEVEL]: 'bonusesHistory.status.level',
};
