import { fetchGet, fetchPost, fetchDelete } from '@/core/services/api/apiBase';
import { UserLimitDto } from '../../domain/limit';

export async function getActiveUserLimits(): Promise<UserLimitDto[]> {
  const result = await fetchGet<UserLimitDto[]>(
    '/official/v1/player/limit/active'
  );
  return result;
}

export async function getPendingUserLimits(): Promise<UserLimitDto[]> {
  const result = await fetchGet<UserLimitDto[]>(
    '/official/v1/player/limit/pending'
  );
  return result;
}

export async function setDailyTimeLimit(hours: number): Promise<void> {
  await fetchPost(`/official/v1/player/limit/daily/time?hours=${hours}`);
}

export async function setTakeABreak({
  endDate,
  startDate,
}: {
  endDate: number;
  startDate: number;
}): Promise<void> {
  await fetchPost(
    `/official//v1/player/limit/take-a-break?endDate=${endDate}&startDate=${startDate}`
  );
}

export async function setDailyDepositAmountLimit(
  amount: number
): Promise<void> {
  await fetchPost(
    `/official/v1/player/limit/daily/deposit/amount?amount=${amount}`
  );
}

export async function setCustomPeriodDepositAmountLimit({
  endDate,
  startDate,
  amount,
}: {
  endDate: number;
  startDate: number;
  amount: number;
}): Promise<void> {
  await fetchPost(
    `/official/v1/player/limit/custom-period/deposit/amount?endDate=${endDate}&startDate=${startDate}&amount=${amount}`
  );
}

export async function setDailyDepositTimesLimit(times: number): Promise<void> {
  await fetchPost(
    `/official/v1/player/limit/daily/deposit/times?times=${times}`
  );
}

export async function setMonthlyDepositAmountLimit(
  amount: number
): Promise<void> {
  await fetchPost(
    `/official/v1/player/limit/monthly/deposit/amount?amount=${amount}`
  );
}

export async function setAutoPlayControlLimit(amount: number): Promise<void> {
  await fetchPost(
    `/official/v1/player/limit/daily/net-loss/amount?amount=${amount}`
  );
}

export async function setCustomPeriodAutoPlayControlAmountLimit({
  endDate,
  startDate,
  amount,
}: {
  endDate: number;
  startDate: number;
  amount: number;
}): Promise<void> {
  await fetchPost(
    `/official/v1/player/limit/custom-period/net-loss/amount?endDate=${endDate}&startDate=${startDate}&amount=${amount}`
  );
}

export async function setRealityCheck(mins: number): Promise<void> {
  await fetchPost(`/official/v1/player/limit/reality-check?mins=${mins}`);
}

export async function cancelDepositLimit() {
  await fetchDelete(`/official/v1/player/limit/cancel/deposit-limit`);
}

export async function cancelNetLossLimit() {
  await fetchDelete(`/official/v1/player/limit/cancel/net-loss-limit`);
}

export async function cancelRealityCheck() {
  await fetchDelete(`/official/v1/player/limit/cancel/reality-check`);
}

export async function cancelTimeLimit() {
  await fetchDelete(`/official/v1/player/limit/cancel/time-limit`);
}
