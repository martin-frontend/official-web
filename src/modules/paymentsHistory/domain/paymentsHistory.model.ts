export interface PaymentsHistory {
  id: number;
  amount: number;
  kind: number;
  remark: string;
  time: string;
  status: PaymentsHistoryStatus;
  paymentChannel: string;
  paymentMerchantId: string;
  providerId: string;
  paymentType: number;
  agentId: number;
  playerId: number;
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
  depositBank: string;
  depositAccount: string;
  phoneNumber: number;
}
export interface WithdrawPaymentsHistory {
  withdrawalOrders: WithdrawalOrderArray[];
  withdrawalApply: WithdrawalApply;
  id: string;
  // amount: number;
  // remark: string;
  time: string;
  status: WithdrawPaymentsHistoryStatus;
  // account: string;
  // agentId: number;
  // applyId: string;
  // payAt: number;
  // playerId: number;
  // providerId: string;
  // transactionStatus: number;
  // withdrawalChannel: string;
  // withdrawalMerchantId: string;
  WithdrawalId: string;
  lastOrderStatus?: number;
  newStatus: string;
  withdrawalType: number;
  reviewedAt: number;
  payTime: number;
  applyStatusM: string;
  orderStatusM: string;
  // updatedAt: number | null;
  // updatedBy: number | null;
  bankName: string;
  bankAccount: string;
}

export interface WithdrawalOrderArray {
  account: string;
  agentId: number;
  amount: number;
  applyId: string;
  id: string;
  payAt: number;
  playerId: number;
  providerId: string;
  status: number;
  time: number;
  transactionStatus: number;
  withdrawalChannel: string;
  withdrawalMerchantId: string;
  withdrawalType: number;
  withdrawalOrderMap: WithdrawalOrder;
  lastOrderStatus: number;
}

export interface WithdrawalApply {
  account: string;
  agentId: number;
  amount: number;
  amountStatus: number;
  bankAccount: string;
  bankAccountName: string;
  bankCode: string;
  bankName: string;
  clientIp: string;
  country: string;
  currency: string;
  device: string;
  id: string;
  lastOrderStatus: number;
  phone: string;
  playerId: number;
  remark: string;
  reviewedAt: number;
  reviewedBy: number;
  status: number;
  time: number;
  updatedAt: number;
  updatedBy: number;
  visitorId: string;
  withdrawalType: number;
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
  // level?: number;
  // nameUpdatable?: boolean;
  // notificationEnabled?: true;
  // phoneNumberVerified?: true;
  // tel?: string;
  // account_typee?: string;
  playerName?: string;
}
export interface PaymentType {
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

export enum WithdrawPaymentsHistoryStatus {
  PENDING = 0,
  PASS = 1,
  REFUSE = 2,
}

export interface WithdrawalOrder {
  account: string;
  agentId: number;
  amount: string;
  amountStatus: number;
  bankAccount: string;
  bankAccountName: string;
  bankCode: string;
  bankName: string;
  clientIp: string;
  currency: string;
  date: string;
  device: string;
  id: string;
  applyId: number;
  payType: number;
  phone: string;
  playerId: number;
  remark: string;
  reviewedAt: number;
  reviewedBy: number;
  status: string;
  time: string;
  updatedAt: number | null;
  updatedBy: number | null;
  payAt: number;
}

export interface WithdrawalOrderObject {
  applyId: string;
  withdrawalOrderMap: WithdrawalOrder;
  id: string;
  lastOrderStatus: number;
  payAt: number;
}

export interface PaymentsHistoryObject {
  content: PaymentsHistory[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
export interface WithdrawalObject {
  content: WithdrawPaymentsHistory[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  applyId: string;
  withdrawalOrderMap: WithdrawalOrder;
  id: string;
  lastOrderStatus: number;
  payAt: number;
}
export interface GetPaymentsHistoryDto {
  page: number;
  size: number;
  startTime: Date;
  endTime: Date;
  // type?:
  status?: PaymentsHistoryStatus;
  statusShrink?: PlayerActivityStatus;
}

export interface GetWithdrawPaymentsHistoryDto {
  page: number;
  size: number;
  startTime: Date;
  endTime: Date;
  // type?:
  status?: WithdrawPaymentsHistoryStatus;
  lastOrderStatusShrink: number;
}
export type SearchCompletedUserEventForm = {
  startDate: Date;
  endDate: Date;
  page: number;
  statusShrink: PlayerActivityStatus;
};

export type WithdrawSearchCompletedUserEventForm = {
  startDate: Date;
  endDate: Date;
  page: number;
  status?: WithdrawPaymentsHistoryStatus;
  lastOrderStatusShrink: WithdralPlayerActivityStatus;
};
enum PlayerActivityStatus {
  all = 99,
  Successful = 1,
  Pending = 0,
  Failed = -1,
}

enum WithdralPlayerActivityStatus {
  SeeAll = 99,
  WithdrawProcessing = 0,
  WithdrawSuccessed = 1,
  WithdrawFailed = -1,
  ApplyProcessing = 4,
  ApplyFailed = 2,
  ApplySuccessed = 3,
}

// ----------------------------------優化靈感(Jay)---------------------------------

// enum ApplyStatus {
//   PENDING = 0,
//   PASS = 1,
//   FAILED = 2,
// }

// enum OrderStatus {
//   FAILED = -1,
//   PENDING = 0,
//   SUCCESS = 1,
// }

// enum OptionStatus {
//   ALL = -1,
//   APPLY_PENDING = 0,
//   APPLY_PASS = 1,
//   APPLY_FAILED = 2,
//   ORDER_FAILED = 3,
//   ORDER_PENDING = 4,
//   ORDER_SUCCESS = 5,
// }
// export interface Withdraw {
//   applyStatus: ApplyStatus;
//   lastOrderStatus?: OrderStatus;
// }

// const withdraw: Withdraw = {
//   applyStatus: ApplyStatus.PASS,
//   lastOrderStatus: OrderStatus.PENDING,
// };

// function convertToApplyStatus(status: OptionStatus): ApplyStatus | null {
//   switch (status) {
//     case OptionStatus.APPLY_FAILED:
//       return ApplyStatus.FAILED;
//     default:
//       return null;
//   }
// }

// function convertToOrderStatus(status: OptionStatus): OrderStatus | null {
//   switch (status) {
//     case OptionStatus.APPLY_FAILED:
//       return ApplyStatus.FAILED;
//     default:
//       return null;
//   }
// }

// const status = OptionStatus.APPLY_FAILED;

// getXxx({
//   lastOrderStatusShrink: convertToApplyStatus(status),
//   status: convertToOrderStatus(status),
// });
