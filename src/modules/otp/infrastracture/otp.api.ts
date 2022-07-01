import { Limitation } from '@/modules/otp/domain/otp.model';
import { fetchGet, fetchPost } from '@/core/services/api/apiBase';
import { OtpTiming } from '@/modules/otp/domain/otpTiming';

export function getOtpLimitation(otpTiming: OtpTiming): Promise<Limitation> {
  return fetchGet<Limitation>('/official/v1/player/otp/limitation', {
    otpTiming,
  });
}

export function sendOtp(otpTiming: OtpTiming) {
  return fetchPost('/official/v1/player/otp/send', { otpTiming });
}
