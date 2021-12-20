import moment from 'moment';

// export type LimitType = 0 | 1 | 101 | 102 | 112 | 122 | 201 | 301 | 311;
export enum LimitType {
  RealityCheck = 0,
  TimeLimit = 1,
  DepositLimitDayCount = 101,
  DepositLimitDayAmount = 102,
  DepositLimitMonthAmount = 112,
  DepositLimitSingleSetting = 122,
  TakeABreak = 201,
  AutoPlayLimitDayAmount = 301,
  AutoPlayLimitSingleSetting = 311,
  RealityCheckCancel = 900,
  TimeLimitCancel = 901,
  DepositLimitCancel = 902,
  AutoPlayLimitCancel = 903,
}

export enum TimeLimitType {
  '4HOURS' = 4,
  '6HOURS' = 6,
  '8HOURS' = 8,
  '12HOURS' = 12,
  CANCEL = 'cancel',
}

export enum TakeABreakType {
  '24HOURS' = 1,
  '3DAYS' = 3,
  '1WEEK' = 7,
  '1MONTH' = 30,
  SINGLESETTING = 'singleSetting',
  DEACTIVATEACCOUNT = 9999,
}

export enum DepositLimitType {
  DAILY = 'daily',
  DAILYTIMES = 'dailyTimes',
  MONTHLY = 'monthly',
  SINGLESETTING = 'singleSetting',
  CANCEL = 'cancel',
}

export enum AutoPlayControlsType {
  DAILYAMOUNTLIMIT = 'dailyAmountLimit',
  SINGLESETTING = 'singleSetting',
  CANCEL = 'cancel',
}

export enum RealityCheckType {
  '1HOURS' = 1,
  '6HOURS' = 6,
  '12HOURS' = 12,
}

export interface UserLimitDto {
  amount: number;
  createDate: number;
  currentAmount: number;
  endDate: number;
  id: number;
  playerId: number;
  startDate: number;
  type: LimitType;
}

export interface UserLimit extends UserLimitDto {
  typeGroupName: string;
  duration: string | number;
  status: 'Active' | 'Pending';
  use: {
    useAmount: string | undefined;
    useTime: string | undefined;
  };
  newAmount: string;
}

export const limitTypeMapping = {
  [LimitType.RealityCheck]: {
    name: 'Display window to remind the player of the rest time frequency',
    amountUnit: 'minutes',
    dateRequired: false,
    typeGroupName: 'Reality Checks',
  },
  [LimitType.TimeLimit]: {
    name: 'single day uptime limit',
    amountUnit: 'hours',
    dateRequired: false,
    typeGroupName: 'Time limit',
  },
  [LimitType.DepositLimitDayCount]: {
    name: 'single day deposit limit',
    amountUnit: 'times',
    dateRequired: false,
    typeGroupName: 'Deposit limit',
  },
  [LimitType.DepositLimitMonthAmount]: {
    name: 'single day deposit amount limit',
    amountUnit: 'dollars',
    dateRequired: false,
    typeGroupName: 'Deposit limit',
  },
  [LimitType.DepositLimitDayAmount]: {
    name: 'single month deposit limit',
    amountUnit: 'dollars',
    dateRequired: false,
    typeGroupName: 'Deposit limit',
  },
  [LimitType.DepositLimitSingleSetting]: {
    name: 'deposit amount limit for the period of time',
    amountUnit: 'dollars',
    dateRequired: true,
    typeGroupName: 'Deposit limit',
  },
  [LimitType.TakeABreak]: {
    name: 'temporary suspension of account usage',
    amountUnit: '',
    dateRequired: true,
    typeGroupName: 'Take A Break/Timeouts',
  },
  [LimitType.AutoPlayLimitDayAmount]: {
    name: 'single day stop loss amount',
    amountUnit: 'dollars',
    dateRequired: false,
    typeGroupName: 'Auto Play Limit',
  },
  [LimitType.AutoPlayLimitSingleSetting]: {
    name: 'stop loss amount from the set period',
    amountUnit: 'dollars',
    dateRequired: false,
    typeGroupName: 'Auto Play Limit',
  },
  [LimitType.RealityCheckCancel]: {
    name: 'stop loss amount from the set period',
    amountUnit: 'dollars',
    dateRequired: false,
    typeGroupName: 'Reality Checks',
  },
  [LimitType.TimeLimitCancel]: {
    name: 'stop loss amount from the set period',
    amountUnit: 'dollars',
    dateRequired: false,
    typeGroupName: 'Time limit',
  },
  [LimitType.DepositLimitCancel]: {
    name: 'stop loss amount from the set period',
    amountUnit: 'dollars',
    dateRequired: false,
    typeGroupName: 'Deposit limit',
  },
  [LimitType.AutoPlayLimitCancel]: {
    name: 'stop loss amount from the set period',
    amountUnit: 'dollars',
    dateRequired: false,
    typeGroupName: 'Auto Play Limit',
  },
};

function getUseAmountValue({ currentAmount, amount }: UserLimitDto): string {
  return `${currentAmount?.toFixed(2) || 0} of ${amount?.toFixed(2)} left`;
}

function getUseTimeValue({ startDate }: UserLimitDto): string {
  if (startDate <= 0) {
    return '';
  }

  const nowTime = new Date().getTime();
  const useTime = nowTime - startDate;
  const day = 86400000;
  const hour = 3600000;
  const mintue = 60000;

  let daysValue: string | number =
    useTime > day ? parseInt(`${useTime / day}`, 10) : 0;
  let hoursValue: string | number =
    useTime % day > hour ? parseInt(`${(useTime % day) / hour}`, 10) : 0;
  let mintueValue: string | number =
    (useTime % day) % hour > mintue
      ? parseInt(`${((useTime % day) % hour) / mintue}`, 10)
      : 0;

  daysValue = daysValue > 0 ? `${daysValue} days` : '';
  hoursValue = hoursValue > 0 ? `${hoursValue} hours` : '';
  mintueValue = mintueValue > 0 ? `${mintueValue} mintue` : '';
  return `${daysValue} ${hoursValue} ${mintueValue}`;
}

function getDurationValue(endDate: number, startDate: number): string {
  const day = 86400000;
  const hour = 3600000;
  if (endDate - startDate <= day) {
    return `${(endDate - startDate) / hour} hours`;
  }
  return `${(endDate - startDate) / day} days`;
}

export function getUserLimitFromDto(
  { ...rest }: UserLimitDto,
  status: 'Active' | 'Pending'
): UserLimit {
  const { type, endDate, startDate, amount } = rest;

  const { typeGroupName } = limitTypeMapping[type];

  let newAmount = `$ ${amount}`;
  let duration = '24 hours';

  let useAmount = getUseAmountValue(rest);
  let useTime = getUseTimeValue(rest);

  switch (type) {
    case LimitType.DepositLimitSingleSetting:
    case LimitType.AutoPlayLimitSingleSetting:
      duration = getDurationValue(endDate, startDate);
      break;
    case LimitType.DepositLimitMonthAmount:
      duration = '30 days';
      break;
    case LimitType.DepositLimitDayCount:
      newAmount = `${amount} times`;
      useAmount = `${amount} of ${amount} times`;
      break;
    case LimitType.RealityCheck:
      useAmount = '-';
      newAmount = `${amount / 60} hours`;
      break;
    case LimitType.TimeLimit:
      newAmount = `${amount} hours`;
      break;

    case LimitType.TimeLimitCancel:
    case LimitType.DepositLimitCancel:
    case LimitType.AutoPlayLimitCancel:
      newAmount = 'cancle';
      useAmount = 'cancle';
      duration = 'cancle';
      useTime = '';
      break;
    default:
      break;
  }

  return {
    status,
    ...rest,
    duration,
    typeGroupName,
    use: {
      useTime,
      useAmount,
    },
    newAmount,
  };
}

export function getPeriodTextByDays(days: TakeABreakType | number): string {
  switch (days) {
    case TakeABreakType['24HOURS']:
      return '24 hours';
    case TakeABreakType['1WEEK']:
      return '1 week';
    case TakeABreakType['1MONTH']:
      return '1 month';
    default:
      return `${days} day`;
  }
}

export function getTimeStampRangeFromNow(
  days: TakeABreakType | number
): [number, number] {
  const now = Date.now();
  const start = moment(now).valueOf();
  const end = moment(now).add(days, 'days').valueOf();
  return [start, end];
}
