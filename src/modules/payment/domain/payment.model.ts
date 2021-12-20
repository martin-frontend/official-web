export enum PaymentKind {
  BANK_CARD = 0,
  CREDIT_CARD = 1,
  VIRTUAL_ACCOUNT = 2,
}

export enum PaymentSupport {
  ALL = 0,
  PAYMENT = 1,
  WITHDRAW = 2,
}

export enum PaymentTransactionKind {
  SYSTEM = 0,
  DEPOSIT = 1,
  WITHDRAW = 2,
  ACCOUNT_ADJUSTMENT = 3,
  GAME = 4,
  ACHIEVEMENT = 5,
  ACTIVITY = 6,
  WALLET_TRANSFER = 7,
  REBATE = 10,
}

export enum PaymentTransactionKindOther {
  SEE_ALL = -1,
  SYSTEM = 0,
  DEPOSIT = 1,
  WITHDRAW = 2,
  ACCOUNT_ADJUSTMENT = 3,
  GAME = 4,
  ACHIEVEMENT = 5,
  ACTIVITY = 6,
  WALLET_TRANSFER = 7,
}

export enum PaymentTransactionTypeFilter {
  SEE_ALL = -1,
  DEPOSIT = 1,
  WITHDRAW = 2,
  ACCOUNT_ADJUSTMENT = 3,
  GAME = 4,
  WALLET_TRANSFER = 7,
  REBATE = 10,
}

export enum PaymentTransactionType {
  AMOUNT = 0,
  BONUS = 1,
  REWARD = 2,
  WITHDRAWAL_LIMIT = 3,
}

export enum AchievementCategories {
  CUMULATIVE_BET_AMOUNT = 103,
  CUMULATIVE_LAUNCH_GAME_TIMES = 104,
  CONSECUTIVE_LAUNCH_GAME_DAYS = 203,
  CUMULATIVE_ACHIEVEMENT_COMPLETED_TIMES = 106,
  CUMULATIVE_LOGIN_TIMES = 105,
  CONSECUTIVE_LOGIN_DAYS = 201,
  CUMULATIVE_DEPOSIT_TIMES = 101,
  CUMULATIVE_DEPOSIT_AMOUNT = 102,
  CONSECUTIVE_DEPOSIT_DAYS = 202,
  NAME_FILLING = 1,
  PHONE_VERIFICATION = 2,
  EMAIL_VERIFICATION = 3,
  DEPOSIT = 4,
  WITHDRAWAL = 5,
  CREDIT_CARD_BINDING = 6,
  WITHDRAWAL_PASSWORD_SETTING = 7,
}

export interface PaymentOption {
  display: boolean;
  id: number;
  kind: PaymentKind;
  logoUrl: string;
  // support: PaymentSupport;
  name: string;
  maxAmount?: number;
  minAmount?: number;
  minProcessingTime: number;
  processingTime: number;
  rank: number;
  tabletLogoUrl?: string;
}

export interface PaymentTransaction {
  id: number;
  amount: string | number;
  afterAmount: string | number;
  beforeAmount: string | number;
  item: string;
  kind: PaymentTransactionKind;
  orderId: string;
  playerId: string;
  remark: string;
  time: string;
  type: number;
  key?: string;
  detailed?: string;
  date?: string;
  achievementId: number;
  completedAt: number;
  currentAmount: number;
  rewardReceivedAt: number;
  description: string;
  imageUrl: string;
  mobileImageUrl: string;
  rewardAmount: number;
  tabletImageUrl: string;
  target: AchievementCategories;
  targetAmount: number;
  title: string;
}
export interface RewardDetail {
  id: number;
  amount: string | number;
  afterAmount: string | number;
  beforeAmount: string | number;
  item: string;
  kind: PaymentTransactionKind;
  orderId: string;
  playerId: string;
  remark: string;
  time: string;
  type: number;
  key?: string;
  detailed?: string;
  date?: string;
  achievementId: number;
  completedAt: number;
  currentAmount: number;
  rewardReceivedAt: number;
  description: string;
  imageUrl: string;
  mobileImageUrl: string;
  rewardAmount: number;
  tabletImageUrl: string;
  target: AchievementCategories;
  targetAmount: number;
  title: string;
  rewardReceivedTime: number | string;
  achievementTarget: string;
  achievementTargetType: string;
  achievementTargetTypeName: string;
}
export interface PaymentTransactionObject {
  content: PaymentTransaction[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface GetPaymentTransactionsDto {
  page: number;
  size: number;
  startTime: Date;
  endTime: Date;
  type?: PaymentTransactionType;
  kind?: PaymentTransactionKind | null;
  sort?: string[];
}

export interface GetPaymentTransactionsDtoOther {
  page: number;
  size: number;
  startTime: Date;
  endTime: Date;
  type?: PaymentTransactionType;
  kind?: PaymentTransactionKindOther | null;
  sort?: string[];
}
export interface UserInfo {
  address?: string;
  birthday?: number;
  city?: string;
  country?: string;
  createdAt?: number;
  email?: string;
  emailVerified?: boolean;
  firstname?: string;
  kycLevel?: number;
  language?: string;
  lastLoginAt?: number;
  lastname?: string;
  level?: number;
  nameUpdatable?: boolean;
  tel?: string;
  account_typee?: string;
  playerName?: string;
}
export interface AchievementDto {
  description: string;
  id: number;
  imageUrl: string;
  mobileImageUrl: string;
  rewardAmount: number;
  tabletImageUrl: string;
  target: AchievementCategories;
  targetAmount: number;
  title: string;
}
export interface PlayerAchievementDto {
  achievementId: number;
  completedAt: number;
  currentAmount: number;
  rewardReceivedAt: number;
}
export interface AchievementId {
  achievementId: string;
}
export interface WithdrawDetail {
  id: number;
  amount: string | number;
  afterAmount: string | number;
  beforeAmount: string | number;
  item: string;
  kind: PaymentTransactionKind;
  orderId: string;
  playerId: string;
  remark: string;
  time: string;
  type: number;
  key?: string;
  detailed?: string;
  date?: string;
  achievementId: number;
  completedAt: number;
  currentAmount: number;
  rewardReceivedAt: number;
  description: string;
  imageUrl: string;
  mobileImageUrl: string;
  rewardAmount: number;
  tabletImageUrl: string;
  target: AchievementCategories;
  targetAmount: number;
  title: string;
  status: PaymentsHistoryStatus | string | AccountingAdjustmentStatus;
  paymentChannel: string;
  paymentMerchantId: string;
  providerId: string;
  paymentType: number;
  agentId: number;
  account: string;
  payAt: number;
  phone?: string | null;
  fee: number;
  transactionStatus: number;
  bankCode: string;
  clientIp: string;
  device: string;
  country: string;
  visitorId: string;
  bankAccount: string;
  payAtTime: string;
  dateAndTime: string;
  depositAccount: string;
  depositBank: string;
  paymentTypeOption: undefined | string;
  adjustmentTime: string | number;
  adjustmentReason: string;
  adjustmentStatus?: AccountingAdjustmentStatus | string;
}
export interface AccountingAdjustment {
  accountingAdjustment: AccountingAdjustmentDetailData;
}
export interface Rebate {
  id: number;
  time: number;
  agentId: number;
  playerId: number;
  level: number;
  gameCategory: string;
  rate: number;
  validBet: number;
  amount: number;
  status: number;
  createAt: number;
  // orderId: number;
  // rebateTime: number;
  // rebateRate: number;
}
export interface AccountingAdjustmentDetailData {
  id: number;
  orderNo: string;
  agentId: number;
  playerId: number;
  appliedAt: number;
  appliedBy: number;
  reviewedAt: number;
  reviewedBy: number;
  applyReason: string;
  amount: number;
  status: AccountingAdjustmentStatus;
  rejectReason: null;
  passReason: string;
}
export enum PaymentsHistoryStatus {
  UNFINISHED = -1,
  FAILED = -2,
  OTHEREXCEPTION = -3,
  BUILDSIGNERROR = -4,
  SIGNERROR = -5,
  AMOUNTERROR = -6,
  INVALIDREQUEST = -7,
  NOTSUPPORTQUERYORDER = -8,
  ILLEGALIP = -9,
  TRADENOERROR = -10,
  UNPAID = 0,
  OK = 1,
  TEST = 2,
}
export interface PaymentsHistoryOrderId {
  orderId: string;
}
export interface ApplyId {
  applyId: string;
}
export interface OrderNo {
  orderNo: string;
}
export interface RebateId {
  id: string;
}
export interface PaynentTransactionsDetail {
  id: number | string;
  amount: string | number;
  afterAmount: string | number;
  beforeAmount: string | number;
  item: string;
  kind: PaymentTransactionKind | string;
  orderId: string;
  playerId: string;
  remark: string;
  time: string;
  type: number;
  key?: string;
  detailed?: string;
  date?: string;
  achievementId: number;
  completedAt: number;
  currentAmount: number;
  rewardReceivedAt: number;
  description: string;
  imageUrl: string;
  mobileImageUrl: string;
  rewardAmount: number;
  tabletImageUrl: string;
  target: AchievementCategories;
  targetAmount: number;
  title: string;
  status: PaymentsHistoryStatus | string;
  paymentChannel: string;
  paymentMerchantId: string;
  providerId: string;
  paymentType: number;
  agentId: number;
  account: string;
  payAt: number;
  phone?: string | null;
  fee: number;
  transactionStatus: number;
  bankCode: string;
  clientIp: string;
  device: string;
  country: string;
  visitorId: string;
  bankAccount: string;
  payAtTime: string;
  dateAndTime: string;
  depositAccount: string;
  depositBank: string;
  paymentTypeOption: undefined | string;
  payAtDay: string;
  withdrawBank: string;
  withdrawAccount: string;
  reviewdDateAndTime: string;
  withdrawalId: string;
  applyStatusM: string;
  orderStatusM: string;
  adjustmentTime: string | number;
  adjustmentReason: string;
  adjustmentStatus?: AccountingAdjustmentStatus | string;
  rebateTime: string;
  rebateRate: string;
}

export enum AccountingAdjustmentStatus {
  PENDING = 0,
  PASS = 1,
  REJECT = 2,
}
