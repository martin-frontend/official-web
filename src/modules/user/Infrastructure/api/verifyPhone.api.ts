import { fetchGet, fetchPost } from '@/core/services/api/apiBase';
import { LimitationsInfo } from '@/modules/user/domain/user.otp.limit';

export default async function getPhoneNumberOtpLimitation(): Promise<LimitationsInfo> {
  const result = await fetchGet<LimitationsInfo>(
    '/official/v1/player/phone-number/otp/limitation'
  );
  return result;
}

export async function sendPhoneNumberOtp() {
  const result = await fetchPost<string>(
    '/official/v1/player/phone-number/otp/send'
  );
  return result;
}

export async function verifyPhoneNumber(otp: string): Promise<string> {
  const result = await fetchPost<string>(
    '/official/v1/player/phone-number/verify',
    {
      otp,
    }
  );
  return result;
}
