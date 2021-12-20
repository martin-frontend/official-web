import { fetchPost, fetchPut } from '@/core/services/api/apiBase';

export async function settingWithdrawalPassword(
  password: string
): Promise<boolean> {
  try {
    await fetchPost<string>('/offical/v1/player/withdrawal-password', {
      password,
    });
    return true;
  } catch (e) {
    return false;
  }
}

// export async function forgotPassword(): Promise<WithdrawalPaymentMethodDto> {
//   const response: WithdrawalPaymentMethodDto =
//     await fetchPost<WithdrawalPaymentMethodDto>(
//       '/offical/v1/player/withdrawal-password/forgot'
//     );

//   return response;
// }
// export async function hasWithdrawalPasswordBeenSet(): Promise<WithdrawalPaymentMethodDto> {
//   const response: WithdrawalPaymentMethodDto =
//     await fetchGet<WithdrawalPaymentMethodDto>(
//       '/offical/v1/player/withdrawal-password/has-been-set'
//     );

//   return response;
// }

export interface ResetPasswordDto {
  password: 'string';
  token: 'string';
}

export async function resetPassword(
  resetPasswordDto: ResetPasswordDto
): Promise<string> {
  const response = await fetchPut<string>(
    '/offical/v1/player/withdrawal-password/reset',
    resetPasswordDto
  );

  return response;
}
