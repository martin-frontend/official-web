import {
  AchievementCategories,
  PaymentTransactionKind,
  AccountingAdjustmentStatus,
} from './payment.model';

export const PAYMENT_TRANSACTION_KINE_I18N_KEYS: Record<
  PaymentTransactionKind,
  string
> = {
  [PaymentTransactionKind.SYSTEM]: 'payment.transaction.kind.SYSTEM',
  [PaymentTransactionKind.DEPOSIT]: 'payment.transaction.kind.DEPOSIT',
  [PaymentTransactionKind.WITHDRAW]: 'payment.transaction.kind.WITHDRAW',
  [PaymentTransactionKind.ACCOUNT_ADJUSTMENT]:
    'payment.transaction.kind.ACCOUNT_ADJUSTMENT',
  [PaymentTransactionKind.GAME]: 'payment.transaction.kind.GAME',
  [PaymentTransactionKind.ACHIEVEMENT]: 'payment.transaction.kind.ACHIEVEMENT',
  [PaymentTransactionKind.ACTIVITY]: 'payment.transaction.kind.ACTIVITY',
  [PaymentTransactionKind.WALLET_TRANSFER]:
    'payment.transaction.kind.WALLET_TRANSFER',
  [PaymentTransactionKind.REBATE]: 'payment.transaction.kind.REBATE',
};

export const REWARD_I18N_KEYS: Record<AchievementCategories, string> = {
  [AchievementCategories.CUMULATIVE_BET_AMOUNT]:
    'payment.reward.category.CUMULATIVE_BET_AMOUNT',
  [AchievementCategories.CUMULATIVE_LAUNCH_GAME_TIMES]:
    'payment.reward.category.CUMULATIVE_LAUNCH_GAME_TIMES',
  [AchievementCategories.CONSECUTIVE_LAUNCH_GAME_DAYS]:
    'payment.reward.category.CONSECUTIVE_LAUNCH_GAME_DAYS',
  [AchievementCategories.CUMULATIVE_ACHIEVEMENT_COMPLETED_TIMES]:
    'payment.reward.category.CUMULATIVE_ACHIEVEMENT_COMPLETED_TIMES',
  [AchievementCategories.CUMULATIVE_LOGIN_TIMES]:
    'payment.reward.category.CUMULATIVE_LOGIN_TIMES',
  [AchievementCategories.CONSECUTIVE_LOGIN_DAYS]:
    'payment.reward.category.CONSECUTIVE_LOGIN_DAYS',
  [AchievementCategories.CUMULATIVE_DEPOSIT_TIMES]:
    'payment.reward.category.CUMULATIVE_DEPOSIT_TIMES',
  [AchievementCategories.CUMULATIVE_DEPOSIT_AMOUNT]:
    'payment.reward.category.CUMULATIVE_DEPOSIT_AMOUNT',
  [AchievementCategories.CONSECUTIVE_DEPOSIT_DAYS]:
    'payment.reward.category.CONSECUTIVE_DEPOSIT_DAYS',
  [AchievementCategories.NAME_FILLING]: 'payment.reward.category.NAME_FILLING',
  [AchievementCategories.PHONE_VERIFICATION]:
    'payment.reward.category.PHONE_VERIFICATION',
  [AchievementCategories.EMAIL_VERIFICATION]:
    'payment.reward.category.EMAIL_VERIFICATION',
  [AchievementCategories.DEPOSIT]: 'payment.reward.category.DEPOSIT',
  [AchievementCategories.WITHDRAWAL]: 'payment.reward.category.WITHDRAWAL',
  [AchievementCategories.CREDIT_CARD_BINDING]:
    'payment.reward.category.CREDIT_CARD_BINDING',
  [AchievementCategories.WITHDRAWAL_PASSWORD_SETTING]:
    'payment.reward.category.WITHDRAWAL_PASSWORD_SETTING',
};

export const ACCOUNT_ADJUSTIMENT_STATUS_I18N_KEYS: Record<
  AccountingAdjustmentStatus,
  string
> = {
  [AccountingAdjustmentStatus.PENDING]:
    'payment.balance_withdraw.status.PENDING',
  [AccountingAdjustmentStatus.PASS]: 'payment.balance_withdraw.status.PASS',
  [AccountingAdjustmentStatus.REJECT]: 'payment.balance_withdraw.status.REJECT',
};
