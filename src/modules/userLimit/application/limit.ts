import {
  AutoPlayControlsType,
  TakeABreakType,
  TimeLimitType,
  UserLimit,
  getUserLimitFromDto,
  getPeriodTextByDays,
  getTimeStampRangeFromNow,
  DepositLimitType,
  RealityCheckType,
  // SingleSettingType,
} from '../domain/limit';
import {
  cancelDepositLimit,
  cancelNetLossLimit,
  cancelTimeLimit,
  getActiveUserLimits,
  getPendingUserLimits,
  setAutoPlayControlLimit,
  setCustomPeriodAutoPlayControlAmountLimit,
  setCustomPeriodDepositAmountLimit,
  // setCustomPeriodAutoPlayControlAmountLimit,
  // setCustomPeriodDepositAmountLimit,
  setDailyDepositAmountLimit,
  setDailyDepositTimesLimit,
  setDailyTimeLimit,
  setMonthlyDepositAmountLimit,
  setRealityCheck,
  setTakeABreak,
} from '@/modules/userLimit/infrastructure/api/limitApi';
import useDialogStore from '@/core/shared/dialogStore';
import useLimitStore from '../infrastructure/store/limitStore';

const defaultDialogSetting = {
  title: 'Please confirm',
  okOtherButtonText: 'NO',
  okButtonText: 'YES',
  isOtherOkButtonShown: true,
  isCancelButtonShown: false,
};

const timeLimitDialogSetting = {
  title: 'You’ve been playing for a while now',
  message:
    'You’ve been playing 15m, during this time you have won $0.00 real money and won $0.00 bonus money. You can keep playing or take a break.',
  cancelButtonText: 'PLAY',
  okButtonText: 'INTERRURT',
  isClockShown: true,
};

export async function getAllUserLimit(): Promise<void> {
  const [activeUserLimits, pendingUserLimits] = await Promise.all([
    getActiveUserLimits(),
    getPendingUserLimits(),
  ]);

  const userLimit: UserLimit[] = [
    ...activeUserLimits.map((item) => getUserLimitFromDto(item, 'Active')),
    ...pendingUserLimits.map((item) => getUserLimitFromDto(item, 'Pending')),
  ];

  const limitStore = useLimitStore();
  limitStore.setUserLimits(userLimit);
}

export async function submitDailyTimeLimit(
  dailyTimeLimit: undefined | TimeLimitType
): Promise<void> {
  if (!dailyTimeLimit) return;
  const dialogStore = useDialogStore();

  if (dailyTimeLimit === TimeLimitType.CANCEL) {
    dialogStore.popUp({
      ...defaultDialogSetting,
      message: `Do you want to cancel this setting?`,
      async onOk() {
        await cancelTimeLimit();
        getAllUserLimit();
      },
    });
    return;
  }

  dialogStore.popUp({
    ...timeLimitDialogSetting,
    async onCancel() {
      await setDailyTimeLimit(dailyTimeLimit);
      getAllUserLimit();
    },
  });
}

export async function submitTakeABreak(
  days: undefined | TakeABreakType,
  singleSettingDays?: number
): Promise<void> {
  if (!days) return;

  if (days === TakeABreakType.SINGLESETTING && !singleSettingDays) {
    return;
  }
  const dialogStore = useDialogStore();

  const takeABreakPeriodText: string = getPeriodTextByDays(
    singleSettingDays || days
  );
  const [startDate, endDate] = getTimeStampRangeFromNow(
    singleSettingDays || days
  );

  const message = `Do you want to set up self-exclusion for ${takeABreakPeriodText}?`;

  dialogStore.popUp({
    ...defaultDialogSetting,
    message,
    async onOk() {
      await setTakeABreak({ startDate, endDate });
      getAllUserLimit();
    },
  });
}

export async function submitDepositLimit(
  type: DepositLimitType | undefined,
  value: number,
  days?: number
): Promise<void> {
  if (!type || (!value && type !== DepositLimitType.CANCEL)) return;

  const dialogStore = useDialogStore();
  switch (type) {
    case DepositLimitType.DAILY:
      dialogStore.popUp({
        ...defaultDialogSetting,
        message: `Do you want to create Deposit limit $${value} for every 24 hours?`,
        async onOk() {
          await setDailyDepositAmountLimit(value);
          getAllUserLimit();
        },
      });
      break;
    case DepositLimitType.DAILYTIMES:
      dialogStore.popUp({
        ...defaultDialogSetting,
        message: `Do you want to set daily deposit times limit to $${value}?`,
        async onOk() {
          await setDailyDepositTimesLimit(value);
          getAllUserLimit();
        },
      });
      break;
    case DepositLimitType.MONTHLY:
      dialogStore.popUp({
        ...defaultDialogSetting,
        message: `Do you want to set monthly deposit limit to $${value}?`,
        async onOk() {
          await setMonthlyDepositAmountLimit(value);
          getAllUserLimit();
        },
      });
      break;
    case DepositLimitType.SINGLESETTING:
      if (!days) {
        return;
      }
      dialogStore.popUp({
        ...defaultDialogSetting,
        message: `Do you want create Deposit limit $${value} for every ${days} days?`,
        async onOk() {
          if (!days) {
            return;
          }
          const [startDate, endDate] = getTimeStampRangeFromNow(days);
          await setCustomPeriodDepositAmountLimit({
            endDate,
            startDate,
            amount: value,
          });
          getAllUserLimit();
        },
      });
      break;
    case DepositLimitType.CANCEL:
      dialogStore.popUp({
        ...defaultDialogSetting,
        message: `Do you want to cancel this setting?`,
        async onOk() {
          await cancelDepositLimit();
          getAllUserLimit();
        },
      });
      break;
    default:
      break;
  }
}

export async function submitAutoPlayControlLimit(
  type: AutoPlayControlsType | undefined,
  value: number,
  days?: number
): Promise<void> {
  if (!type || (!value && type !== AutoPlayControlsType.CANCEL)) return;

  const dialogStore = useDialogStore();
  switch (type) {
    case AutoPlayControlsType.DAILYAMOUNTLIMIT:
      dialogStore.popUp({
        ...defaultDialogSetting,
        message: `Do you want to set daily auto play amount limit to ${value}?`,
        async onOk() {
          await setAutoPlayControlLimit(value);
          getAllUserLimit();
        },
      });
      break;
    case AutoPlayControlsType.SINGLESETTING:
      dialogStore.popUp({
        ...defaultDialogSetting,
        message: `Do you want to set daily auto play amount limit to ${value} for every ${days} days?`,
        async onOk() {
          if (!days) {
            return;
          }
          const [startDate, endDate] = getTimeStampRangeFromNow(days);
          await setCustomPeriodAutoPlayControlAmountLimit({
            endDate,
            startDate,
            amount: value,
          });
          getAllUserLimit();
        },
      });
      break;
    case AutoPlayControlsType.CANCEL:
      dialogStore.popUp({
        ...defaultDialogSetting,
        message: `Do you want to cancel this setting?`,
        async onOk() {
          await cancelNetLossLimit();
          getAllUserLimit();
        },
      });
      break;
    default:
      break;
  }
}

export async function submitRealityCheck(
  hours: RealityCheckType | undefined
): Promise<void> {
  if (!hours) return;

  const mins = hours * 60;
  const dialogStore = useDialogStore();

  dialogStore.popUp({
    ...defaultDialogSetting,
    message: `Do you want to set reality check to ${hours} hours?`,
    async onOk() {
      await setRealityCheck(mins);
      getAllUserLimit();
    },
  });
}
